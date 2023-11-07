import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entitys/user.entity';
import { Payment } from 'src/entitys/paymentdetails.entity';
import { PaymentAuthService } from './payment.auth';
import { ConnectBankAuthService } from './connect-bank.auth';
import { connect } from 'http2';
import { BankConnection } from 'src/entitys/connect-bank.entity';
// import { EmailService } from '../email/email.service';
@Injectable()
export class ConnectBankService {
  constructor(
    @InjectRepository(BankConnection) private repo: Repository<BankConnection>, // private emailService: EmailService,
  ) {}

  create(
    paymentway: string,
    reference: string,
    amount: string,
    due: string,
    userId: string,
  ) {
    const connect = this.repo.create({
      paymentway,
      reference,
      amount,
      due,
      userId,
    });

    return this.repo.save(connect);
  }
  //
  findOne(id: number) {
    if (!id) {
      return null;
    }
    return this.repo.findOneBy({ id });
  }
  find(userId: string) {
    return this.repo.findBy({ userId });
  }

  async update(id: number, attrs: Partial<Payment>) {
    const connect = await this.findOne(id);
    if (!connect) {
      throw new NotFoundException('user not found');
    }
    Object.assign(connect, attrs);
    return this.repo.save(connect);
  }

  async remove(id: number) {
    const connect = await this.findOne(id);
    if (!connect) {
      throw new NotFoundException('user not found');
    }
    return this.repo.remove(connect);
  }
}
