import { HttpService, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTrainingDto } from './create-training.dto';
import { Training, TrainingDocument } from './training.schema';
import { ObjectID } from 'bson';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { PostTrainingDto } from './post-training.dto';
import { PostTrainToTrainServerDto } from './post-train-to-train-server.dto';


@Injectable()
export class TrainingService {
  constructor(
    @InjectModel(Training.name) private trainingModel: Model<TrainingDocument>,
    private httpService: HttpService,
  ) {}

  async create(
    directoryDoc_id: string, 
    trainingConfigurationDoc_id: string, 
    augmentationDoc_id: string,
    postTrainingDtoName: string,
    serverId: string,
  ): Promise<TrainingDocument> {
    console.log(`[training service] create`);
    const createTrainingDto = this.buildCreateTrainingDto(directoryDoc_id, trainingConfigurationDoc_id, augmentationDoc_id, postTrainingDtoName, serverId);
    const createdDoc = new this.trainingModel(createTrainingDto);
    return createdDoc.save();
  }

  async deleteTrainingBy_id(_id: string): Promise<TrainingDocument> {
    console.log(`[training service] deleteTrainingBy_id`);
    return this.trainingModel.findByIdAndDelete(_id).exec();
  }

  async findTrainingBy_id(_id: string): Promise<any> {
    console.log(`[training service] findTrainingBy_id`);
    return this.trainingModel.findById(_id).exec();
  }

  async getTrainPages(pageNo: number): Promise<any[]> {
    console.log(`[training service] getTrainPages`);
    const perPage = 15;
    return this.trainingModel
      .find({})
      .sort({ createdAt: -1 })
      .limit(perPage)
      .skip(perPage * (pageNo-1))
      .select({ _id: 1})
      .exec();
  }

  buildCreateTrainingDto(
    directoryDoc_id: string, 
    trainingConfigurationDoc_id: string, 
    augmentationDoc_id: string,
    postTrainingDtoName: string,
    serverId: string,
  ): CreateTrainingDto {
    return {
      _id: (new ObjectID()).toString(),
      name: postTrainingDtoName,
      serverId: serverId,
      directoryId: directoryDoc_id,
      configurationId: trainingConfigurationDoc_id,
      augmentationId: augmentationDoc_id,
    }
  }
}
