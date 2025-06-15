import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';

@Injectable()
export class AuthService {
  generateConfirmationToken(): string {
    return randomBytes(32).toString('hex');
  }

  isValidTokenFormat(token: string): boolean {
    return /^[a-f0-9]{64}$/.test(token);
  }
}
