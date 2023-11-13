import {
  IsEmail,
  IsNotEmpty,
  //IsNumber,
  IsString,
  //Length,
} from 'class-validator';

export class CreatepaymentDto {
  @IsNotEmpty()
  paymentway: string;
  @IsNotEmpty()
  //@IsNumber()
  //@Length(10)
  reference: string;

  @IsString()
  amount: string;

  @IsString()
  due: string;
}
