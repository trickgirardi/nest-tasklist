import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from '@prisma/client';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskFiltersDto } from './dto/task-filters.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  async findAll(@Query() filters?: TaskFiltersDto): Promise<Task[]> {
    return this.tasksService.findAll(filters);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Task | null> {
    return this.tasksService.findById(id);
  }

  @Get('count')
  async count(): Promise<{ count: number }> {
    const count = await this.tasksService.count();
    return { count };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Task> {
    return this.tasksService.delete(id);
  }
}
