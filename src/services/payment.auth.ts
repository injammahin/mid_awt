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
    name: string,
    phone: string,
    email: string,
    password: string,
    companyName: string,
  ) {
    // See if email is in use
    const payments = await this.PaymentService.find(email);
    if (payments.length) {
      throw new BadRequestException('email already used');
    }

    const payment = await this.PaymentService.create(
      name,
      phone,
      email,
      password,
      companyName,
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
