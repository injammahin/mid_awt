import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreatepaymentDto {
  @IsNotEmpty()
  paymentway: string;
  @IsNotEmpty()
  reference: string;

  @IsString()
  amount: string;

  @IsString()
  due: string;
}
