import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../../shared/infra/database/database.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserFilters } from 'src/shared/definitions/types';
import { UpdateUserDto } from './dto/update-user.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserCreatedEvent } from './events/user-created.event';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly db: DatabaseService,
    private readonly eventEmitter: EventEmitter2,
    private readonly authService: AuthService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const confirmationToken = this.authService.generateConfirmationToken();

    const user = await this.db.createUser({
      ...createUserDto,
      confirmationToken,
    });

    this.eventEmitter.emit(
      'user.created',
      new UserCreatedEvent(
        user.id,
        user.email,
        confirmationToken,
        user.createdAt,
        user.name,
      ),
    );

    return user;
  }

  async confirmEmail(token: string) {
    if (!this.authService.isValidTokenFormat(token)) {
      throw new NotFoundException('Token inválido');
    }

    const user = await this.db.user.findFirst({
      where: {
        confirmationToken: token,
        isEmailConfirmed: false,
      },
    });

    if (!user) {
      throw new NotFoundException('Token inválido ou já utilizado');
    }

    const confirmedUser = await this.db.user.update({
      where: { id: user.id },
      data: {
        isEmailConfirmed: true,
        confirmationToken: null,
      },
    });

    return confirmedUser;
  }

  async findAll(filters: UserFilters) {
    return this.db.findAllUsers(filters);
  }

  async findOne(id: string) {
    const user = await this.db.findUserById(id);
    return user;
  }

  async count() {
    return this.db.countUsers();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.db.updateUser(id, updateUserDto);
  }

  async delete(id: string) {
    return this.db.deleteUser(id);
  }
}
