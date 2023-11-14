import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  phone: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsNotEmpty()
  companyName: string;
}
