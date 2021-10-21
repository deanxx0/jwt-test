import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class ResponseTrainingDto {
  @ApiProperty()
  @IsNotEmpty()
  id: string;
  @ApiProperty()
  @IsNotEmpty()
  name: string;
  @ApiProperty()
  @IsNotEmpty()
  status: string;
  @ApiProperty()
  @IsNotEmpty()
  progress: number;
  @ApiProperty()
  @IsNotEmpty()
  createdAt: string;
  @ApiProperty()
  @IsNotEmpty()
  train_loss: number;
  @ApiProperty()
  @IsNotEmpty()
  test_loss: number;
  @ApiProperty()
  @IsNotEmpty()
  test_accuracy: number;
  @ApiProperty()
  @IsNotEmpty()
  iou: number;
  @ApiProperty()
  @IsNotEmpty()
  iteration: number;
  @ApiProperty()
  @IsNotEmpty()
  max_iteration: number;
  @ApiProperty()
  @IsNotEmpty()
  directoryId: string;
  @ApiProperty()
  @IsNotEmpty()
  configurationId: string;
  @ApiProperty()
  @IsNotEmpty()
  augmentationId: string;
}
