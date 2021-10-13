import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTrainingDto } from './create-training.dto';
import { PostTrainingDto } from './post-training.dto';
import { Training, TrainingDocument } from './training.schema';
import { ObjectID } from 'bson';

@Injectable()
export class TrainingService {
  constructor(
    @InjectModel(Training.name) private trainingModel: Model<TrainingDocument>,
  ) {}

  // async create(postTrainingDto: PostTrainingDto): Promise<TrainingDocument> {
  //   const createTrainingDto = this.buildCreateTrainingDto(postTrainingDto);
  //   const createdDoc = new this.trainingModel(createTrainingDto);
  //   return createdDoc.save();
  // }

  async findOneById(_id: string): Promise<TrainingDocument> {
    return this.trainingModel.findOne({ _id: _id }).exec();
  }

  // buildCreateTrainingDto(postTrainingDto: PostTrainingDto): CreateTrainingDto {
  //   return {
  //     _id: (new ObjectID()).toString(),
  //     name: postTrainingDto.name,
  //     serverId: postTrainingDto.serverId,
  //     directoryId: postTrainingDto.directoryId,
  //     configurationId: postTrainingDto.configurationId,
  //     augmentationId: postTrainingDto.augmentationId,
  //   }
  // }
}
