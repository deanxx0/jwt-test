import { Body, Controller, Get, Header, Post, Req, Request, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request as ExpressRequest, Response } from 'express';
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

  @UsePipes(ValidationPipe)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: 'id,pw 인증', description: 'token 발행' })
  @ApiCreatedResponse({ description: 'access token 발행' })
  @ApiBody({ type: UserDto })
  // @Header('jwt', 'none')
  async login(@Request() req, @Res({ passthrough: true }) response: Response) {
    console.log(`Post login!`);
    // return this.authService.login(req.user);
    const tokenObj = await this.authService.login(req.user);
    response.set('Authorization', tokenObj.access_token);

    // response.cookie(
    //   'access_token',
    //   tokenObj.access_token,
    //   {
    //     httpOnly: true,
    //     sameSite: 'none',
    //     secure: true,
    //     expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    //   }
    // )
  }

  @UseGuards(JwtAuthGuard)
  @Get('mytoken')
  @ApiOperation({ summary: 'my token', description: 'get now using token in cookie' })
  async getMyToken(@Req() request: ExpressRequest) {
    console.log(`Get mytoken!`);
    return request.headers.authorization;
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiOperation({ summary: 'Get userid, username'})
  async getProfile(@Request() req) {
    console.log(`Get profile!`);
    return req.user;
  }

  @UsePipes(ValidationPipe)
  @Post('user')
  async createUser(@Body() userDto: UserDto): Promise<UserDocument> {
    console.log(`Post user!`);
    return this.userService.create(userDto);
  }
}
