import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}
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
      throw new BadRequestException('email already used');
    }

    const user = await this.usersService.create(
      name,
      phone,
      email,
      password,
      companyName,
    );

    return user;
  }

  async signin(email: string, password: string) {
    const [user] = await this.usersService.find(email);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    if (user.password !== password) {
      throw new BadRequestException('wrong password');
    }

    return user;
  }
}
