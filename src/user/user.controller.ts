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

  @UsePipes(ValidationPipe)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: 'id,pw 인증', description: 'token 발행' })
  @ApiCreatedResponse({ description: 'access token 발행' })
  @ApiBody({ type: UserDto })
  async login(@Request() req, @Res({ passthrough: true }) response: Response): Promise<ApiResponseDto> {
    console.log(`[user controller] login`);
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
  @Get('profile')
  @ApiOperation({ summary: 'Get userid, username'})
  @ApiBearerAuth()
  async getProfile(@Request() req) {
    console.log(`[user controller] getProfile`);
    return this.userService.findOne(req.user.username);
  }

  @UseGuards(JwtAuthGuard)
  @Get('mytoken')
  @ApiOperation({ summary: 'my token', description: 'get now using token in cookie' })
  @ApiBearerAuth()
  async getMyToken(@Req() request: ExpressRequest) {
    console.log(`[user controller] getMyToken`);
    return request.headers.authorization;
  }

  @UsePipes(ValidationPipe)
  @Post('user')
  async createUser(@Body() userDto: UserDto): Promise<UserDocument> {
    console.log(`[user controller] createUser`);
    return this.userService.create(userDto);
  }
}
