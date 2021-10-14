import { HttpService, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTrainingDto } from './create-training.dto';
import { Training, TrainingDocument } from './training.schema';
import { ObjectID } from 'bson';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';


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
  ): Promise<TrainingDocument> {
    const createTrainingDto = this.buildCreateTrainingDto(directoryDoc_id, trainingConfigurationDoc_id, augmentationDoc_id, postTrainingDtoName);
    const createdDoc = new this.trainingModel(createTrainingDto);
    return createdDoc.save();
  }

  async deleteTrainingBy_id(_id: string): Promise<TrainingDocument> {
    return this.trainingModel.findByIdAndDelete(_id).exec();
  }

  async getTrainInfoFromTrainServer(_id: string): Promise<Observable<AxiosResponse<any>>> {
    const response = await this.httpService.get(`http://localhost:3000/${_id}`).toPromise();
    return response.data;
  }

  buildCreateTrainingDto(
    directoryDoc_id: string, 
    trainingConfigurationDoc_id: string, 
    augmentationDoc_id: string,
    postTrainingDtoName: string,
  ): CreateTrainingDto {
    return {
      _id: (new ObjectID()).toString(),
      name: postTrainingDtoName,
      serverId: "server0_test_serverId",
      directoryId: directoryDoc_id,
      configurationId: trainingConfigurationDoc_id,
      augmentationId: augmentationDoc_id,
    }
  }
}
