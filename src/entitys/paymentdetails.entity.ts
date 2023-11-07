import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Payment {
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
}
