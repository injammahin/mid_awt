// users.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entitys/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(
    name: string,
    phone: string,
    email: string,
    password: string,
    companyName: string,
  ) {
    const user = this.repo.create({
      name,
      phone,
      email,
      password,
      companyName,
    });

    return this.repo.save(user);
  }

  findOne(id: number) {
    if (!id) {
      return null;
    }
    return this.repo.find({
      where: {
        id: id,
      },
      relations: {
        Connect_bank: true,
        Payments: true,
      },
    });
  }

  find(email: string) {
    return this.repo.find({
      where: {
        email: email,
      },
    });
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.repo.remove(user);
  }
}
