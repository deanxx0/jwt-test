import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { ObjectId } from "mongoose";

export class TrainingDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  serverId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  directoryId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  configurationId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  augmentationId: string;
}