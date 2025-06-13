import { Priority, TaskStatus } from '../enums';

export interface CreateTaskData {
  title: string;
  description?: string;
  status?: TaskStatus;
  priority?: Priority;
  dueDate?: Date;
  userId?: string;
}

export interface UpdateTaskData {
  title?: string;
  description?: string;
  status?: TaskStatus;
  priority?: Priority;
  dueDate?: Date;
  userId?: string;
}

export interface TaskFilters {
  status?: TaskStatus;
  priority?: Priority;
  userId?: string;
  title?: string;
  dueDateBefore?: Date;
  dueDateAfter?: Date;
  createdAfter?: Date;
  createdBefore?: Date;
}
