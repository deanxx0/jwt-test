import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class ApiResponseDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  success: boolean;
  @ApiProperty()
  @IsNotEmpty()
  result: object;
}