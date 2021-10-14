import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Augmentation, AugmentationDocument } from './augmentation.schema';
import { ObjectID } from 'bson';
import { PostTrainingDto } from 'src/training/post-training.dto';
import { CreateAugmentationDto } from './create-augmentation.dto';

@Injectable()
export class AugmentationService {
  constructor(
    @InjectModel(Augmentation.name) private augmentationModel: Model<AugmentationDocument>
  ) {}

  async create(postTrainingDto: PostTrainingDto): Promise<AugmentationDocument> {
    const createAugmentationDto = this.buildCreateAugmentationDto(postTrainingDto);
    const createdDoc = new this.augmentationModel(createAugmentationDto);
    return createdDoc.save();
  }

  async findOneById(_id: string): Promise<AugmentationDocument> {
    return this.augmentationModel.findOne({ _id: _id }).exec();
  }

  buildCreateAugmentationDto(postTrainingDto: PostTrainingDto): CreateAugmentationDto {
    return {
      _id: (new ObjectID()).toString(),
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
  }
}
