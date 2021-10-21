import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostTrainingDto } from 'src/training/post-training.dto';
import { CreateTrainingConfigurationDto } from './create-training-configuration.dto';
import { TrainingConfiguration, TrainingConfigurationDocument } from './training-configuration.schema';
import { ObjectID } from 'bson';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TrainingConfigurationService {
  constructor(
    @InjectModel(TrainingConfiguration.name) private trainingConfigurationModel: Model<TrainingConfigurationDocument>,
  ) {}

  async create(postTrainingDto: PostTrainingDto): Promise<TrainingConfigurationDocument> {
    console.log(`[training configuration service] create`);
    const createTrainingConfigurationDto = this.buildCreateTrainingConfigurationDto(postTrainingDto);
    const createdDoc = new this.trainingConfigurationModel(createTrainingConfigurationDto);
    return createdDoc.save();
  }

  async findOneById(_id: string): Promise<TrainingConfigurationDocument> {
    console.log(`[training configuration service] findOneById`);
    return this.trainingConfigurationModel.findOne({ _id: _id }).exec();
  }

  async deleteConfigurationBy_id(_id: string): Promise<TrainingConfigurationDocument> {
    console.log(`[training configuration service] deleteConfigurationBy_id`);
    return this.trainingConfigurationModel.findByIdAndDelete(_id).exec();
  }

  buildCreateTrainingConfigurationDto(postTrainingDto: PostTrainingDto): CreateTrainingConfigurationDto {
    return {
      _id: (new ObjectID()).toString(),
      batchSize: postTrainingDto.configuration.batchSize,
      pretrainData: postTrainingDto.configuration.pretrainData,
      width: postTrainingDto.configuration.width,
      height: postTrainingDto.configuration.height,
      channels: postTrainingDto.configuration.channels,
      baseLearningRate: postTrainingDto.configuration.baseLearningRate,
      gamma: postTrainingDto.configuration.gamma,
      stepCount: postTrainingDto.configuration.stepCount,
      maxIteration: postTrainingDto.configuration.maxIteration,
    }
  }
}
