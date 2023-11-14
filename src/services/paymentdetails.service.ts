import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Payment } from 'src/entitys/paymentdetails.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment) private repo: Repository<Payment>, // private emailService: EmailService,
  ) {}

  create(paymentway: string, reference: string, amount: string, due: string) {
    const payment = this.repo.create({
      paymentway,
      reference,
      amount,
      due,
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

  async update(id: number, attrs: Partial<Payment>) {
    const payment = await this.findOne(id);
    if (!payment) {
      throw new NotFoundException('Payment details not found');
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
