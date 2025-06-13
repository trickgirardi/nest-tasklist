import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient, Task, User } from '@prisma/client';
import {
  CreateTaskData,
  CreateUserData,
  TaskFilters,
  UpdateTaskData,
  UpdateUserData,
  UserFilters,
} from 'src/shared/types';

@Injectable()
export class DatabaseService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  // === USERS ===
  async createUser(data: CreateUserData): Promise<User> {
    return this.user.create({ data });
  }

  async findUserById(id: string): Promise<User | null> {
    return this.user.findUnique({ where: { id } });
  }

  async findAllUsers(filters?: UserFilters): Promise<User[]> {
    return this.user.findMany({
      where: {
        ...filters,
      },
      include: {
        tasks: true,
      },
      orderBy: {
        name: 'asc',
      },
    });
  }

  async updateUser(id: string, data: UpdateUserData): Promise<User> {
    return this.user.update({ where: { id }, data });
  }

  async deleteUser(id: string): Promise<User> {
    return this.user.delete({ where: { id } });
  }

  async countUsers(): Promise<number> {
    return this.user.count();
  }

  // === TASKS ===
  async createTask(data: CreateTaskData): Promise<Task> {
    return this.task.create({ data });
  }

  async findTaskById(id: string): Promise<Task | null> {
    return this.task.findUnique({ where: { id } });
  }

  async findAllTasks(filters?: TaskFilters): Promise<Task[]> {
    return this.task.findMany({
      where: {
        ...filters,
      },
      include: {
        User: true,
      },
      orderBy: {
        title: 'asc',
      },
    });
  }

  async updateTask(id: string, data: UpdateTaskData): Promise<Task> {
    return this.task.update({ where: { id }, data });
  }

  async deleteTask(id: string): Promise<Task> {
    return this.task.delete({ where: { id } });
  }

  async countTasks(): Promise<number> {
    return this.task.count();
  }
}
