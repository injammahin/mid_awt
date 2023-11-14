import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PaymentService } from './paymentdetails.service';
@Injectable()
export class PaymentAuthService {
  constructor(private PaymentService: PaymentService) {}
  async fillup(
    paymentway: string,
    reference: string,
    amount: string,
    due: string,
  ) {
    const payment = await this.PaymentService.create(
      paymentway,
      reference,
      amount,
      due,
    );

    return payment;
  }
}
