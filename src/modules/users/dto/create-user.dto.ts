import { IsEmail, IsOptional, IsString } from 'class-validator';
import { CreateUserData } from 'src/shared/definitions/types';

export class CreateUserDto implements CreateUserData {
  @IsEmail()
  email: string;

  @IsString()
  passwordHash: string;

  @IsOptional()
  @IsString()
  name?: string;
}
