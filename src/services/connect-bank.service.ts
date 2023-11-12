import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from 'src/entitys/paymentdetails.entity';
import { ConnectBankAuthService } from './connect-bank.auth';
import { Connect_bank } from 'src/entitys/connect-bank.entity';

@Injectable()
export class ConnectBankService {
  constructor(
    @InjectRepository(Connect_bank) private repo: Repository<Connect_bank>, // private emailService: EmailService,
  ) {}

  create(
    description: string,
    payee: string,
    category: string,
    spend: string,
    received: string,
    userId: string,
  ) {
    const connect = this.repo.create({
      description,
      payee,
      category,
      spend,
      received,
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
