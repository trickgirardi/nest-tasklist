import { Injectable } from '@nestjs/common';
import { EmailService } from './email.service';
import { OnEvent } from '@nestjs/event-emitter';
import { UserCreatedEvent } from '../users/events/user-created.event';

@Injectable()
export class EmailListeners {
  constructor(private readonly emailService: EmailService) {}

  @OnEvent('user.created')
  async handleUserCreatedEvent(event: UserCreatedEvent) {
    try {
      await this.emailService.sendConfirmationEmail(
        event.email,
        event.name!,
        event.confirmationToken,
      );
    } catch (error) {
      console.error('Erro ao enviar email de confirmação:', error);
    }
  }
}
