import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsEnum,
  IsDate,
  IsUUID,
} from 'class-validator';
import { Priority, TaskStatus } from 'src/shared/definitions/enums';
import { CreateTaskData } from 'src/shared/definitions/types';

export class CreateTaskDto implements CreateTaskData {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsEnum(Priority)
  priority?: Priority;

  @IsOptional()
  @IsDate()
  dueDate?: Date;

  @IsOptional()
  @IsUUID()
  userId?: string;
}
