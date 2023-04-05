import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne({
      where: {
        username,
      },
    });
  }
  async register({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Promise<User> {
    const isOldUser = await this.usersRepository.findOne({
      where: {
        username,
      },
    });
    if (isOldUser) {
      return null;
    }
    const result = await this.usersRepository.save({ username, password });
    return result;
  }
}
