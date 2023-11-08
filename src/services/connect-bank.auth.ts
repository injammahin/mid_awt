import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { PaymentService } from './paymentdetails.service';
import { ConnectBankService } from './connect-bank.service';
@Injectable()
export class ConnectBankAuthService {
  constructor(private ConnectBankService: ConnectBankService) {}
  async fillup(
    description: string,
    payee: string,
    category: string,
    spend: string,
    received: string,
    userId: string,
  ) {
    const payments = await this.ConnectBankService.find(userId);
    if (payments.length) {
      throw new BadRequestException('userid already used');
    }

    const connect = await this.ConnectBankService.create(
      description,
      payee,
      category,
      spend,
      received,
      userId,
    );

    return connect;
  }
}
