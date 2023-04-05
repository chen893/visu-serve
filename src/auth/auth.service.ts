// auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/users.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user && (await user.validatePassword(pass))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user.id };
    return this.jwtService.sign(payload);
  }

  async register(user: User) {
    user.password = await bcrypt.hash(user.password, 12);

    const result = await this.userService.register(user);
    if (result === null) return null;
    return {
      access_token: this.jwtService.sign({
        username: result.username,
        sub: result.id,
      }),
    };
  }
}
