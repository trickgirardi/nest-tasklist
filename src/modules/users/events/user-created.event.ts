export class UserCreatedEvent {
  constructor(
    public readonly userId: string,
    public readonly email: string,
    public readonly confirmationToken: string,
    public readonly createdAt: Date,
    public readonly name: string | null,
  ) {}
}
