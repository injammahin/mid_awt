import { IsOptional } from 'class-validator';

export class UpdateDto {
  @IsOptional()
  name: string;
  @IsOptional()
  phone: string;
  @IsOptional()
  //@IsEmail()
  email: string;
  @IsOptional()
  //@IsString()
  password: string;
  @IsOptional()
  //@IsString()
  companyName: string;
}
export class updateDetailsDto {
  @IsOptional()
  paymentway: string;
  @IsOptional()
  reference: string;
  @IsOptional()
  //@IsEmail()
  amount: string;
  @IsOptional()
  //@IsString()
  due: string;
  @IsOptional()
  //@IsString()
  userId: string;
}
