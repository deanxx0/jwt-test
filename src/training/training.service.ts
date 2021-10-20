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

  async postTrain(postTrainingDto: PostTrainingDto): Promise<string> {
    const postTrainToTrainServerDto = await this.buildPostTrainToTrainServerDto(postTrainingDto);
    const response = await this.httpService.post(
      `http://10.10.1.172:5000/trains`,
      postTrainToTrainServerDto,
    ).toPromise();
    console.log(`[training service] postTrain`);
    return response.data.result.id;
  }

  async getTrainInfoFromTrainServer(_id: string): Promise<Observable<AxiosResponse<any>>> {
    const response = await this.httpService.get(`http://10.10.1.11:5000/training/${_id}`).toPromise();
    console.log(`[training service] getTrainInfoFromTrainServer`);
    return response.data;
  }

  buildPostTrainToTrainServerDto(postTrainingDto: PostTrainingDto): PostTrainToTrainServerDto {
    return {
      target_type: 'venus',
      image_list_path: 'Z:/det_01/img.txt',
      label_list_path: 'Z:/det_01/label.txt',
      val_image_list_path: 'Z:/det_01/img_val.txt',
      val_label_list_path: 'Z:/det_01/label_val.txt',
      train_params: {
        gpu_id: 0,
        iterations: postTrainingDto.configuration.maxIteration,
        network: {
          batch_size: postTrainingDto.configuration.batchSize,
          pretrain_data: postTrainingDto.configuration.pretrainData,
          width: postTrainingDto.configuration.width,
          height: postTrainingDto.configuration.height,
          channels: postTrainingDto.configuration.channels
        },
        patchmode: {
          enabled: 0,
          width: 0,
          height: 0,
        },
        roi: {
          enabled: 0,
          x: 0,
          y: 0,
          width: 0,
          height: 0,
        },
        solver_param: {
          base_learning_rate: postTrainingDto.configuration.baseLearningRate,
          gamma: postTrainingDto.configuration.gamma,
          step_count: postTrainingDto.configuration.stepCount,
        },
        augmentation: {
          mirror: postTrainingDto.augmentation.mirror,
          flip: postTrainingDto.augmentation.flip,
          rotation90: postTrainingDto.augmentation.rotation90,
          zoom: postTrainingDto.augmentation.zoom,
          tilt: postTrainingDto.augmentation.tilt,
          shift: postTrainingDto.augmentation.shift,
          rotation: postTrainingDto.augmentation.rotation,
          contrast: postTrainingDto.augmentation.contrast,
          brightness: postTrainingDto.augmentation.brightness,
          smoothFiltering: postTrainingDto.augmentation.smoothFiltering,
          noise: postTrainingDto.augmentation.noise,
          colorNoise: postTrainingDto.augmentation.colorNoise,
          partialFocus: postTrainingDto.augmentation.partialFocus,
          shade: postTrainingDto.augmentation.shade,
          hue: postTrainingDto.augmentation.hue,
          saturation: postTrainingDto.augmentation.saturation,
          maxRandomAugmentCount: postTrainingDto.augmentation.maxRandomAugmentCount,
          probability: postTrainingDto.augmentation.probability,
          borderMode: postTrainingDto.augmentation.borderMode,
        }
      },
      class_list: {
        1: '1',
        2: '2',
        3: '3',
      },
    }
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
