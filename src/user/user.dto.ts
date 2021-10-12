import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString} from "class-validator";

export class UserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  serverindex: number;
}