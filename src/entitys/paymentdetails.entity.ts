import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  paymentway: string;
  @Column()
  reference: string;
  @Column()
  amount: string;
  @Column()
  due: string;
  @Column()
  userId: string;
}
