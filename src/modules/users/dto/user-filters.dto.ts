import { Type } from 'class-transformer';
import { IsString, IsOptional, IsDate, IsEmail } from 'class-validator';
import { UserFilters } from 'src/shared/types';

export class UserFiltersDto implements UserFilters {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  createdAfter?: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  createdBefore?: Date;
}
