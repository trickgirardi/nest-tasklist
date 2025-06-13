import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserData } from 'src/shared/definitions';

export class UpdateUserDto
  extends PartialType(CreateUserDto)
  implements UpdateUserData {}
