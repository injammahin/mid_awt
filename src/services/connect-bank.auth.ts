import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
// import { UsersService } from '../services/users.service';
import { PaymentService } from './paymentdetails.service';
import { ConnectBankService } from './connect-bank.service';
@Injectable()
export class ConnectBankAuthService {
  constructor(private ConnectBankService: ConnectBankService) {}
  async fillup(
    paymentway: string,
    reference: string,
    amount: string,
    due: string,
    userId: string,
  ) {
    // See if email is in use
    const payments = await this.ConnectBankService.find(userId);
    if (payments.length) {
      throw new BadRequestException('userid already used');
    }

    const connect = await this.ConnectBankService.create(
      paymentway,
      reference,
      amount,
      due,
      userId,
    );
    // throw new BadRequestException('data inserted');
    // throw new BadRequestException('data inserted');

    // return the user
    return connect;
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
