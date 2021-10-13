import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateAugmentationDto {
  @ApiProperty()
  @IsNotEmpty()
  _id: string;
  @ApiProperty()
  @IsNotEmpty()
  mirror: boolean;
  @ApiProperty()
  @IsNotEmpty()
  flip: boolean;
  @ApiProperty()
  @IsNotEmpty()
  rotation90: boolean;
  @ApiProperty()
  @IsNotEmpty()
  zoom: number;
  @ApiProperty()
  @IsNotEmpty()
  tilt: number;
  @ApiProperty()
  @IsNotEmpty()
  shift: number;
  @ApiProperty()
  @IsNotEmpty()
  rotation: number;
  @ApiProperty()
  @IsNotEmpty()
  contrast: number;
  @ApiProperty()
  @IsNotEmpty()
  brightness: number;
  @ApiProperty()
  @IsNotEmpty()
  smoothFiltering: number;
  @ApiProperty()
  @IsNotEmpty()
  noise: number;
  @ApiProperty()
  @IsNotEmpty()
  colorNoise: number;
  @ApiProperty()
  @IsNotEmpty()
  partialFocus: number;
  @ApiProperty()
  @IsNotEmpty()
  shade: number;
  @ApiProperty()
  @IsNotEmpty()
  hue: number;
  @ApiProperty()
  @IsNotEmpty()
  saturation: number;
  @ApiProperty()
  @IsNotEmpty()
  maxRandomAugmentCount: number;
  @ApiProperty()
  @IsNotEmpty()
  probability: number;
  @ApiProperty()
  @IsNotEmpty()
  borderMode: number;
}