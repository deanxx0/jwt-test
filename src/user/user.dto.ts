import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString} from "class-validator";

export class UserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}