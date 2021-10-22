import { HttpService, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Server, ServerDocument } from 'src/server/server.schema';
import { PostTrainingDto } from 'src/training/post-training.dto';
import { PostTrainToTrainServerDto } from 'src/training/post-train-to-train-server.dto';

@Injectable()
export class TrainServerService {
  constructor(
    @InjectModel(Server.name) private serverModel: Model<ServerDocument>,
    private httpService: HttpService,
  ) {}

  async postTrain(serverIndex: number, postTrainingDto: PostTrainingDto): Promise<string> {
    console.log(`[train server service] postTrain`);
    const postTrainToTrainServerDto = await this.buildPostTrainToTrainServerDto(postTrainingDto);
    const serverDoc = await this.serverModel.findOne({ index: serverIndex }).exec();
    const response = await this.httpService.post(
      `http://${serverDoc.uri}/trains`,
      postTrainToTrainServerDto,
    ).toPromise();
    return response.data.result.id;
  }

  async getTrainStatusFromTrainServer(serverIndex: number, serverTrainId: string): Promise<any> {
    console.log(`[train server service] getTrainStatusFromTrainServer`);
    const serverDoc = await this.serverModel.findOne({ index: serverIndex }).exec();
    const response = await this.httpService.get(`http://${serverDoc.uri}/trains/${serverTrainId}`).toPromise();
    return response.data.result.status;
  }

  async getMetricsFromTrainServer(serverIndex: number, serverTrainId: string): Promise<any> {
    console.log(`[train server service] getMetricsFromTrainServer`);
    const serverDoc = await this.serverModel.findOne({ index: serverIndex }).exec();
    const response = await this.httpService.get(`http://${serverDoc.uri}/trains/${serverTrainId}/metrics/pages/0`).toPromise();
    const result: any[] = response.data.result;
    return {
      train_loss: result[result.length-1].train_loss,
      test_loss: result[result.length-1].test_loss,
      test_accuracy: result[result.length-1].test_accuracy,
      iou: result[result.length-1].test_accuracy2,
      iteration: result[result.length-1].current_iteration,
      max_iteration: result[result.length-1].max_iteration,
    }
  }

  async getResources(serverIndex: number): Promise<any> {
    console.log(`[train server service] getResources`);
    const serverDoc = await this.serverModel.findOne({ index: serverIndex }).exec();
    const response = await this.httpService.get(`http://${serverDoc.uri}/resources/${serverIndex}`).toPromise();
    return response.data.result;
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
}
