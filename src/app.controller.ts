import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { UserDto } from './user/user.dto';
import { UserDocument } from './user/user.schema';
import { UserService } from './user/user.service';

@Controller()
@ApiTags('login')
export class AppController {
  constructor(private authService: AuthService, private userService: UserService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @ApiOperation({ summary: 'id,pw 인증', description: 'token 발행' })
  @ApiCreatedResponse({ description: 'access token 발행' })
  @ApiBody({ type: UserDto })
  async login(@Request() req) {
    console.log(`Post auth/login!`);
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    console.log(`Get profile!`);
    return req.user;
  }

  @Post('user')
  createUser(@Body() userDto: UserDto): Promise<UserDocument> {
    console.log(`Post user!`);
    return this.userService.create(userDto);
  }
}
