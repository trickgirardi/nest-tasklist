import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { UpdateTaskData } from 'src/shared/definitions/types';

export class UpdateTaskDto
  extends PartialType(CreateTaskDto)
  implements UpdateTaskData {}
