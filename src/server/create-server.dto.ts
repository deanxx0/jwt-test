import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString} from "class-validator";

export class CreateServerDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  _id: string;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  index: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  uri: string;
}