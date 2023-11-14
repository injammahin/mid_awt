import { IsOptional } from 'class-validator';

export class UpdateDto {
  @IsOptional()
  name: string;
  @IsOptional()
  phone: string;
  @IsOptional()
  email: string;
  @IsOptional()
  password: string;
  @IsOptional()
  companyName: string;
}
export class updateDetailsDto {
  @IsOptional()
  paymentway: string;
  @IsOptional()
  reference: string;
  @IsOptional()
  amount: string;
  @IsOptional()
  due: string;
  @IsOptional()
  userId: string;
}
