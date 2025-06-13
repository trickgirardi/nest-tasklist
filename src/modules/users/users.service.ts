import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserFilters } from 'src/shared/types';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly db: DatabaseService) {}

  async create(createUserDto: CreateUserDto) {
    return this.db.createUser(createUserDto);
  }

  async findAll(filters: UserFilters) {
    return this.db.findAllUsers(filters);
  }

  async findOne(id: string) {
    const user = await this.db.findUserById(id);
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.db.updateUser(id, updateUserDto);
  }

  async delete(id: string) {
    return this.db.deleteUser(id);
  }
}
