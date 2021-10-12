import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class TrainingDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id: string;

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