import { Controller, Get, UseGuards, Request, UsePipes, ValidationPipe, Post, Res, Req, Body } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { ApiResponseDto } from 'src/api-response.dto';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { UserDto } from './user.dto';
import { UserDocument } from './user.schema';
import { UserService } from './user.service';
import { Request as ExpressRequest, Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private userService: UserService, private authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiOperation({ summary: 'Get userid, username'})
  @ApiBearerAuth()
  async getProfile(@Request() req) {
    console.log(`[user controller] Get profile`);
    return this.userService.findOne(req.user.username);
  }

  @UsePipes(ValidationPipe)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: 'id,pw 인증', description: 'token 발행' })
  @ApiCreatedResponse({ description: 'access token 발행' })
  @ApiBody({ type: UserDto })
  async login(@Request() req, @Res({ passthrough: true }) response: Response): Promise<ApiResponseDto> {
    console.log(`[user controller] Post login!`);
    const tokenObj = await this.authService.login(req.user);
    response.set('access_token', tokenObj.access_token);
    const success = tokenObj != null ? true : false;
    return {
      success: success,
      result: {
        access_token: tokenObj.access_token,
      }
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('mytoken')
  @ApiOperation({ summary: 'my token', description: 'get now using token in cookie' })
  @ApiBearerAuth()
  async getMyToken(@Req() request: ExpressRequest) {
    console.log(`[user controller] Get mytoken!`);
    return request.headers.authorization;
  }

  @UsePipes(ValidationPipe)
  @Post('user')
  async createUser(@Body() userDto: UserDto): Promise<UserDocument> {
    console.log(`[user controller] Post user!`);
    return this.userService.create(userDto);
  }
}
