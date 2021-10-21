import { Body, Controller, Get, Header, Post, Req, Request, Res, Sse, UseGuards, UsePipes, ValidationPipe, MessageEvent } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request as ExpressRequest, Response } from 'express';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { UserDto } from './user/user.dto';
import { UserDocument } from './user/user.schema';
import { UserService } from './user/user.service';
import { ApiResponseDto } from './api-response.dto';
import { interval, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Controller()
@ApiTags()
export class AppController {
  constructor() {}

  @Sse('sse')
  sse(): Observable<MessageEvent> {
    console.log(`sse controller method`);
    return interval(1000).pipe(map((_) => ({ data: { hello: 'world' } })));
  }
}
