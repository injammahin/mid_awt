import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
// import { UsersService } from '../services/users.service';
import { PaymentService } from './paymentdetails.service';
@Injectable()
export class PaymentAuthService {
  constructor(private PaymentService: PaymentService) {}
  async fillup(
    paymentway: string,
    reference: string,
    amount: string,
    due: string,
    userId: string,
  ) {
    // See if email is in use
    const payments = await this.PaymentService.find(userId);
    if (payments.length) {
      throw new BadRequestException('userid already used');
    }

    const payment = await this.PaymentService.create(
      paymentway,
      reference,
      amount,
      due,
      userId,
    );
    // throw new BadRequestException('data inserted');
    // throw new BadRequestException('data inserted');

    // return the user
    return payment;
  }
  //
  // async signin(email: string, password: string) {
  //   const [user] = await this.PaymentService.find(email);
  //   if (!user) {
  //     throw new NotFoundException('user not found');
  //   }
  //   if (user.password !== password) {
  //     throw new BadRequestException('wrong password');
  //   }

  //   return user;
  // }
}
