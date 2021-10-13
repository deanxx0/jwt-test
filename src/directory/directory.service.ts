import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDirectoryDto } from './create-directory.dto';
import { Directory, DirectoryDocument } from './directory.schema';
import { PostDirectoryDto } from './post-directory.dto';
import { ObjectID } from 'bson';

@Injectable()
export class DirectoryService {
  constructor(
    @InjectModel(Directory.name) private directoryModel: Model<DirectoryDocument>,
  ) {}

  async create(postDirectoryDto: PostDirectoryDto): Promise<DirectoryDocument> {
    const createDirectoryDto = this.buildCreateDirectoryDto(postDirectoryDto);
    const createdDoc = new this.directoryModel(createDirectoryDto);
    return createdDoc.save();
  }

  async findOneById(_id: string): Promise<DirectoryDocument> {
    return this.directoryModel.findOne({ _id: _id }).exec();
  }

  buildCreateDirectoryDto(postDirectoryDto: PostDirectoryDto): CreateDirectoryDto {
    return {
      _id: (new ObjectID()).toString(),
      directories: postDirectoryDto.directories,
    }
  }
}
