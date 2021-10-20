import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class PostTrainingDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsNotEmpty()
  datasets: string[];
  @ApiProperty()
  @IsNotEmpty()
  augmentation: {
    mirror: boolean,
    flip: boolean,
    rotation90: boolean,
    zoom: number,
    tilt: number,
    shift: number,
    rotation: number,
    contrast: number,
    brightness: number,
    smoothFiltering: number,
    noise: number,
    colorNoise: number,
    partialFocus: number,
    shade: number,
    hue: number,
    saturation: number,
    maxRandomAugmentCount: number,
    probability: number,
    borderMode: number,
  };
  @ApiProperty()
  @IsNotEmpty()
  configuration: {
    batchSize: number,
    pretrainedData: string,
    width: number,
    height: number,
    channels: number,
    baseLearningRate: number,
    gamma: number,
    stepCount: number,
    maxIteration: number,
  }
}