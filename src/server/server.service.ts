import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Server } from 'http';
import { Model } from 'mongoose';
import { CreateServerDto } from './create-server.dto';
import { PostServerDto } from './post-server.dto';
import { ServerDocument } from './server.schema';
import { ObjectID } from 'bson';

@Injectable()
export class ServerService {
  constructor(
    @InjectModel(Server.name) private serverModel: Model<ServerDocument>,
  ) {}

  async create(postServerDto: PostServerDto): Promise<ServerDocument> {
    console.log(`[server service] create`);
    const createServerDto = this.buildCreateServerDto(postServerDto);
    const createdDoc = new this.serverModel(createServerDto);
    return createdDoc.save();
  }

  async findOneByIndex(index: number): Promise<ServerDocument> {
    console.log(`[server service] findOneByIndex`);
    return this.serverModel.findOne({ index: index }).exec();
  }

  buildCreateServerDto(postServerDto: PostServerDto): CreateServerDto {
    return {
      _id: (new ObjectID()).toString(),
      index: postServerDto.index,
      uri: postServerDto.uri,
    }
  }
}
