import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDirectoryDto } from './create-directory.dto';
import { Directory, DirectoryDocument } from './directory.schema';
import { ObjectID } from 'bson';
import { PostTrainingDto } from 'src/training/post-training.dto';

@Injectable()
export class DirectoryService {
  constructor(
    @InjectModel(Directory.name) private directoryModel: Model<DirectoryDocument>,
  ) {}

  async createFromTraining(postTrainingDto: PostTrainingDto): Promise<DirectoryDocument> {
    console.log(`[directory service] createFromTraining`);
    const createDirectoryDto = this.buildCreateDirectoryDtoFromTraining(postTrainingDto);
    const createdDoc = new this.directoryModel(createDirectoryDto);
    return createdDoc.save();
  }

  async findOneById(_id: string): Promise<DirectoryDocument> {
    console.log(`[directory service] findOneById`);
    return this.directoryModel.findOne({ _id: _id }).exec();
  }

  async deleteDirectoryBy_id(_id: string): Promise<DirectoryDocument> {
    console.log(`[directory service] deleteDirectoryBy_id`);
    return this.directoryModel.findByIdAndDelete(_id).exec();
  }

  buildCreateDirectoryDtoFromTraining(postTrainingDto: PostTrainingDto): CreateDirectoryDto {
    return {
      _id: (new ObjectID()).toString(),
      directories: postTrainingDto.datasets,
    }
  }
}
