import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { User } from './user.entity';

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

  @OneToOne(() => User, (User) => User.Connect_bank) // specify inverse side as a second parameter
  user: User;
}
