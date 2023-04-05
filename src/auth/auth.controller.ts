// auth.controller.ts
import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
// import { LocalAuthGuard } from './local-auth.guard';
// import { JwtAuthGuard } from './jwt-auth.guard';
import { User } from '../users/users.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return {
      statusCode: 200,
      message: '登录成功',
      data: {
        access_token: await this.authService.login(req.user),
      },
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('register')
  async register(@Body() user: User) {
    const result = await this.authService.register(user);

    return {
      statusCode: result === null ? 409 : 200,
      message: result === null ? '用户名已存在' : '创建成功',
      data: result,
    };
  }
}
