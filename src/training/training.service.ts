import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TrainingDto } from './training.dto';
import { Training, TrainingDocument } from './training.schema';

@Injectable()
export class TrainingService {
  constructor(
    @InjectModel(Training.name) private trainingModel: Model<TrainingDocument>,
  ) {}

  async create(trainingDto: TrainingDto): Promise<TrainingDocument> {
    const createdDoc = new this.trainingModel(trainingDto);
    return createdDoc.save();
  }

  async findOneById(_id: string): Promise<TrainingDocument> {
    return this.trainingModel.findOne({ _id: _id }).exec();
  }
}
