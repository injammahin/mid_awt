import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  paymentWay: string;
  @Column()
  reference: string;
  @Column()
  amount: string;
  @Column()
  due: string;
  @Column()
  userId: string;
}
