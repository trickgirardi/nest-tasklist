export interface CreateUserData {
  email: string;
  passwordHash: string;
  name?: string;
  confirmationToken?: string;
}

export interface UpdateUserData {
  email?: string;
  passwordHash?: string;
  name?: string;
}

export interface UserFilters {
  email?: string;
  name?: string;
  createdAfter?: Date;
  createdBefore?: Date;
}
