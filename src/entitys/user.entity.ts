import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Connect_bank } from './connect-bank.entity';
import { Payment } from './paymentdetails.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  phone: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column()
  companyName: string;

  @OneToOne(() => Connect_bank, (Connect_bank) => Connect_bank.user, {
    cascade: true,
  })
  @JoinColumn()
  Connect_bank: Connect_bank;

  @OneToMany(() => Payment, (Payment) => Payment.users)
  Payments: Payment[];
}
