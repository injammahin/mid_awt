import {
  IsEmail,
  IsNotEmpty,
  //IsNumber,
  IsString,
  //Length,
} from 'class-validator';

export class CreateBankConnectionDto {
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

  @IsNotEmpty()
  userId: string;
}
