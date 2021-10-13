import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class PostTestingDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  datasets: string[];

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  trainId: string;
}
