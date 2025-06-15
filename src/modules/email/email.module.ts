import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailListeners } from './email.listeners';

@Module({
  providers: [EmailService, EmailListeners],
})
export class EmailModule {}
