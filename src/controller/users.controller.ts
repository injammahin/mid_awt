import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  Patch,
  Session,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { UsersService } from '../services/users.service';
import { AuthService } from 'src/users/user.auth';
import { LoginUserDto } from 'src/dtos/login-user.dto';
import { UpdateDto } from 'src/dtos/update.dto';
import { User } from 'src/entitys/user.entity';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import session, { Cookie } from 'express-session';

@Controller('auth')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    // password hashing
    const salt = await bcrypt.genSalt();
    const hashedPass = await bcrypt.hash(body.password, 10);
    body.password = hashedPass;

    const user = await this.authService.signup(
      body.name,
      body.phone,
      body.email,
      body.password,
      body.companyName,
    );

    // return 200;
    // session.userId = user.id;
    return {
      user: user.user,
      token: user.token,
      message: 'Signup successful',
    };
  }
  catch(error) {
    // Handle specific errors if needed
    throw error;
  }

  @Post('signin')
  async signIn(
    @Session() session,
    @Body(ValidationPipe)
    { email, password }: { email: string; password: string },
  ) {
    try {
      const result = await this.authService.signin(email);
      // console.log('result', JSON.stringify(result.user, null, 2));
      session.userId = result.user.id;
      return {
        user: result.user,
        token: result.token,
        message: 'Signin successful',
      };
      // session.userId = user.id;
    } catch (error) {
      throw error;
    }
  }
  @Post('/signout')
  logout(@Session() session: any) {
    session.userId = null;
    return 'sign out';
  }
  @Post('/:id')
  findUser(@Param('id') id: string) {
    return this.usersService.findOne(parseInt(id));
  }
  @Get('/profile')
  async profile(@Session() session: any) {
    const data = await this.usersService.findOne(session.userId);
    if (!data) {
      return 'log in first';
    } else {
      // const { password, ...profileData } = data;
      return data;
    }
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }

  @Put('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateDto) {
    return this.usersService.update(parseInt(id), body);
  }

  @Get('set-cookie')
  findAll(@Res({ passthrough: true }) response: Response) {
    response.cookie('key', '1234');
    return ' Cookie set successfully';
  }
}
