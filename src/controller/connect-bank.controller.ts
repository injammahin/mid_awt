import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Session,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { PaymentService } from 'src/services/paymentdetails.service';
import { AuthService } from 'src/users/user.auth';
import { PaymentAuthService } from 'src/services/payment.auth';
import { updateDetailsDto } from 'src/dtos/update.dto';
import { CreateBankConnectionDto } from 'src/dtos/connect-bank.dto';
import { ConnectBankAuthService } from 'src/services/connect-bank.auth';
import { ConnectBankService } from 'src/services/connect-bank.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('bank reconcilation')
@Controller('connect')
export class BankController {
  constructor(
    private ConnectBankAuthService: ConnectBankAuthService,
    private ConnectBankService: ConnectBankService,
  ) {}

  @Post('/bank')
  async createUser(
    @Body() body: CreateBankConnectionDto,
    @Session() session: any,
  ) {
    const connection = await this.ConnectBankAuthService.fillup(
      body.description,
      body.payee,
      body.category,
      body.spend,
      body.received,
      body.userId,
    );
    return connection;
  }

  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.ConnectBankService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.ConnectBankService.remove(parseInt(id));
  }

  @Put('/:id')
  updateUser(@Param('id') id: string, @Body() body: updateDetailsDto) {
    return this.ConnectBankService.update(parseInt(id), body);
  }
}
