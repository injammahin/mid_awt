import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateBankConnectionDto {
  @IsString()
  description: string;
  @IsString()
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
