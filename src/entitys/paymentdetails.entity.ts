import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

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

  // @Column({ default: null })
  // paysliip: string;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  paysliip: Date;
  @ManyToOne(() => User, (user) => user.Payments, { onDelete: 'SET NULL' })
  users: User;
}
