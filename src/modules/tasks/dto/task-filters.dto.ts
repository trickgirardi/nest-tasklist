import { Type } from 'class-transformer';
import { IsString, IsOptional, IsDate, IsEnum, IsUUID } from 'class-validator';
import { TaskFilters } from 'src/shared/definitions/types';
import { TaskStatus, Priority } from 'src/shared/definitions/enums';

export class TaskFiltersDto implements TaskFilters {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsEnum(Priority)
  priority?: Priority;

  @IsOptional()
  @IsUUID()
  userId?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  dueDateAfter?: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  dueDateBefore?: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  createdAfter?: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  createdBefore?: Date;
}
