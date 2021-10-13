import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateTrainingConfigurationDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  _id: string;
  @ApiProperty()
  @IsNotEmpty()
  batch_size: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  pretrain_data: string;
  @ApiProperty()
  @IsNotEmpty()
  width: number;
  @ApiProperty()
  @IsNotEmpty()
  height: number;
  @ApiProperty()
  @IsNotEmpty()
  channels: number;
  @ApiProperty()
  @IsNotEmpty()
  baseLearningRate: number;
  @ApiProperty()
  @IsNotEmpty()
  gamma: number;
  @ApiProperty()
  @IsNotEmpty()
  stepCount: number;
}