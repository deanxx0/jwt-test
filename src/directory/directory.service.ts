import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDirectoryDto } from './create-directory.dto';
import { Directory, DirectoryDocument } from './directory.schema';
import { ObjectID } from 'bson';
import { PostTrainingDto } from 'src/training/post-training.dto';
import { PostTestingDto } from 'src/testing/post-testing.dto';

@Injectable()
export class DirectoryService {
  constructor(
    @InjectModel(Directory.name) private directoryModel: Model<DirectoryDocument>,
  ) {}

  async createFromTraining(postTrainingDto: PostTrainingDto): Promise<DirectoryDocument> {
    const createDirectoryDto = this.buildCreateDirectoryDtoFromTraining(postTrainingDto);
    const createdDoc = new this.directoryModel(createDirectoryDto);
    return createdDoc.save();
  }
  
  async createFromTesting(postTestingDto: PostTestingDto): Promise<DirectoryDocument> {
    const createDirectoryDto = this.buildCreateDirectoryDtoFromTesting(postTestingDto);
    const createdDoc = new this.directoryModel(createDirectoryDto);
    return createdDoc.save();
  }

  async findOneById(_id: string): Promise<DirectoryDocument> {
    return this.directoryModel.findOne({ _id: _id }).exec();
  }

  buildCreateDirectoryDtoFromTraining(postTrainingDto: PostTrainingDto): CreateDirectoryDto {
    return {
      _id: (new ObjectID()).toString(),
      directories: postTrainingDto.datasets,
    }
  }
  
  buildCreateDirectoryDtoFromTesting(postTestingDto: PostTestingDto): CreateDirectoryDto {
    return {
      _id: (new ObjectID()).toString(),
      directories: postTestingDto.datasets,
    }
  }
}
