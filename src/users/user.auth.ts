// auth.service.ts
import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signup(
    name: string,
    phone: string,
    email: string,
    password: string,
    companyName: string,
  ) {
    // See if email is in use
    const users = await this.usersService.find(email);
    if (users.length) {
      throw new BadRequestException('Email already used');
    }

    const user = await this.usersService.create(
      name,
      phone,
      email,
      password,
      companyName,
    );

    // Generate JWT token after successful signup
    const token = this.jwtService.sign({ sub: user.id, email: user.email });
    return { user, token };
  }

  async signin(email: string, password: string) {
    try {
      const [user] = await this.usersService.find(email);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      // Check if user.password exists before comparing
      if (!user.password) {
        throw new BadRequestException('Invalid user object');
      }

      // Compare the provided password with the hashed password in the database
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        throw new BadRequestException('Invalid password');
      }

      // Generate JWT token after successful signin
      const token = this.jwtService.sign({ sub: user.id, email: user.email });
      return { user, token };
    } catch (error) {
      throw error; // Rethrow the error if it's not related to user not found
    }
  }
  async validateUser(payload: any) {
    // You can add additional validation logic here if needed
    const user = await this.usersService.findOne(payload.sub);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
