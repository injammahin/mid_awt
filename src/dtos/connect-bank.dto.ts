import {
  IsEmail,
  IsNotEmpty,
  //IsNumber,
  IsString,
  //Length,
} from 'class-validator';

export class CreateBankConnectionDto {
  @IsString()
  description: string;
  @IsString()
  //@IsNumber()
  //@Length(10)
  payee: string;

  @IsString()
  category: string;

  @IsString()
  spend: string;

  @IsNotEmpty()
  received: string;
  @IsNotEmpty()
  userId: string;
}
