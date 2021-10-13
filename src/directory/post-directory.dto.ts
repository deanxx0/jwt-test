import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class PostDirectoryDto {
  @ApiProperty()
  @IsNotEmpty()
  directories: string[];
}