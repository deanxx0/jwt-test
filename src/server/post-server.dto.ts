import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString} from "class-validator";

export class PostServerDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  index: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  uri: string;
}