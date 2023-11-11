import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Session,
  ValidationPipe,
} from '@nestjs/common';

import { UsersService } from '../services/users.service';
import { PaymentService } from 'src/services/paymentdetails.service';
import { AuthService } from 'src/users/user.auth';
import { LoginUserDto } from 'src/dtos/login-user.dto';
import { UpdateDto } from 'src/dtos/update.dto';
import { CreatepaymentDto } from 'src/dtos/payment-details.dto';
import { PaymentAuthService } from 'src/services/payment.auth';
import { Payment } from 'src/entitys/paymentdetails.entity';
import { updateDetailsDto } from 'src/dtos/update.dto';

@Controller('payment')
export class PaymentController {
  constructor(
    // private usersService: UsersService,
    // private authService: AuthService,
    private PaymentService: PaymentService,
    private PaymentAuthService: PaymentAuthService,
  ) {}

  @Post('/fillup')
  async createUser(@Body() body: CreatepaymentDto, @Session() session: any) {
    const payment = await this.PaymentAuthService.fillup(
      body.paymentway,
      body.reference,
      body.amount,
      body.due,
      body.userId,
    );
    return payment;
  }

  @Post('/:id')
  findUser(@Param('id') id: string) {
    return this.PaymentService.findOne(parseInt(id));
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.PaymentService.remove(parseInt(id));
  }

  @Put('/:id')
  updateUser(@Param('id') id: string, @Body() body: updateDetailsDto) {
    return this.PaymentService.update(parseInt(id), body);
  }
}
