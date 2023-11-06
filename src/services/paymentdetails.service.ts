import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entitys/user.entity';
import { Payment } from 'src/entitys/paymentdetails.entity';
// import { EmailService } from '../email/email.service';
@Injectable()
export class paymentService {
  constructor(
    @InjectRepository(Payment) private repo: Repository<Payment>, // private emailService: EmailService,
  ) {}

  create(
    paymentWay: string,
    reference: string,
    amount: string,
    due: string,
    userId: string,
  ) {
    const Payment = this.repo.create({
      paymentWay,
      reference,
      amount,
      due,
      userId,
    });

    return this.repo.save(Payment);
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

  async update(id: number, attrs: Partial<User>) {
    const Payment = await this.findOne(id);
    if (!Payment) {
      throw new NotFoundException('user not found');
    }
    Object.assign(Payment, attrs);
    return this.repo.save(Payment);
  }

  async remove(id: number) {
    const Payment = await this.findOne(id);
    if (!Payment) {
      throw new NotFoundException('user not found');
    }
    return this.repo.remove(Payment);
  }
}
