import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from './user.dto';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async create(userDto: UserDto): Promise<UserDocument> {
    const createdDoc = new this.userModel(userDto);
    return createdDoc.save();
  }

  async findOne(username: string): Promise<UserDocument> {
    return this.userModel.findOne({ username: username }).exec();
  }
}
