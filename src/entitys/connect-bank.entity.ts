import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Connect_bank {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  description: string;
  @Column()
  payee: string;
  @Column()
  category: string;
  @Column()
  spend: string;
  @Column()
  received: string;
  @Column()
  userId: string;
}
