import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entitys/user.entity';
import { Payment } from 'src/entitys/paymentdetails.entity';
import { PaymentAuthService } from './payment.auth';
// import { EmailService } from '../email/email.service';
@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment) private repo: Repository<Payment>, // private emailService: EmailService,
  ) {}

  create(
    name: string,
    phone: string,
    email: string,
    password: string,
    companyName: string,
  ) {
    const payment = this.repo.create({
      name,
      phone,
      email,
      password,
      companyName,
    });

    return this.repo.save(payment);
  }
  //
  findOne(id: number) {
    if (!id) {
      return null;
    }
    return this.repo.findOneBy({ id });
  }
  find(email: string) {
    return this.repo.findBy({ email });
  }

  async update(id: number, attrs: Partial<Payment>) {
    const payment = await this.findOne(id);
    if (!payment) {
      throw new NotFoundException('user not found');
    }
    Object.assign(payment, attrs);
    return this.repo.save(payment);
  }

  async remove(id: number) {
    const payment = await this.findOne(id);
    if (!payment) {
      throw new NotFoundException('user not found');
    }
    return this.repo.remove(payment);
  }
}
