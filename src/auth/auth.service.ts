import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  // async validateUser(username: string, pass: string): Promise<any> {
  //   const user = await this.usersService.findOne(username);
  //   if (user && user.password === pass) {
  //     const { password, ...result } = user;
  //     return result;
  //   }
  //   return null;
  // }

  async validateUser(username: string, pass: string): Promise<any> {
    console.log(`[auth service] validateUser`);
    const user = await this.userService.findOne(username);
    if (user && user.password === pass) {
      // const { password, ...result } = user;
      // return result;
      return user;
    }
    return null;
  }

  async login(user: any) {
    // const payload = { username: user.username, sub: user.userId };
    // console.log(`user._id: ${user._doc._id}, user.username: ${user._doc.username}, user.password: ${user._doc.password}`);
    console.log(`[auth service] login`);
    const payload = { username: user.username, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
