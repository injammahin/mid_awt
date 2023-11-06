import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Patch,
  Session,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { UsersService } from '../services/users.service';
import { AuthService } from 'src/users/user.auth';
import { LoginUserDto } from 'src/dtos/login-user.dto';
import { UpdateDto } from 'src/dtos/update.dto';
import { paymentService } from 'src/services/paymentdetails.service';

@Controller('payment')
export class PaymentController {
  constructor(
    // private emailService: EmailService,
    private usersService: UsersService,
    private authService: AuthService,
    private paymentService: paymentService, // private messageService: MessageService,
  ) {}

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(
      body.name,
      body.phone,
      body.email,
      body.password,
      body.companyName,
    );
    return user;
  }
  @Post('/signin')
  async signin(@Body() body: LoginUserDto, @Session() session: any) {
    const Payment = await this.authService.signin(body.email, body.password);

    return Payment;
  }
  @Post('/:id')
  findUser(@Param('id') id: string) {
    return this.usersService.findOne(parseInt(id));
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }

  @Put('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateDto) {
    return this.usersService.update(parseInt(id), body);
  }
}
