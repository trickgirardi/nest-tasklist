import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/shared/infra/database/database.service';
import { Task } from '@prisma/client';
import { UpdateTaskDto } from './dto/update-task.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskFiltersDto } from './dto/task-filters.dto';

@Injectable()
export class TasksService {
  constructor(private readonly database: DatabaseService) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.database.createTask(createTaskDto);
  }

  async findById(id: string): Promise<Task | null> {
    return this.database.findTaskById(id);
  }

  async findAll(filters?: TaskFiltersDto): Promise<Task[]> {
    return this.database.findAllTasks(filters);
  }

  async count(): Promise<number> {
    return this.database.countTasks();
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    return this.database.updateTask(id, updateTaskDto);
  }

  async delete(id: string): Promise<Task> {
    return this.database.deleteTask(id);
  }
}
