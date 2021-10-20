import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString} from "class-validator";

export class CreateServerDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  _id: string;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  index: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  uri: string;
}