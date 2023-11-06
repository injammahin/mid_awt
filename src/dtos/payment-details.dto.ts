import {
  IsEmail,
  IsNotEmpty,
  //IsNumber,
  IsString,
  //Length,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  paymentWay: string;
  @IsNotEmpty()
  //@IsNumber()
  //@Length(10)
  reference: string;

  @IsEmail()
  amount: string;

  @IsString()
  due: string;

  @IsNotEmpty()
  userId: string;
}
