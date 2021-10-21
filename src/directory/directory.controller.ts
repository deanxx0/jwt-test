import { Controller, Get, Param, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ApiResponseDto } from 'src/api-response.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { DirectoryService } from './directory.service';

@Controller('directories')
export class DirectoryController {
  constructor(
    private dirctoryService: DirectoryService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Get(':_id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'get directory' })
  async getDirectoriesBy_id(@Param('_id') _id: string): Promise<ApiResponseDto> {
    console.log(`[directory controller] get directories by id!`);
    const directoryDoc = await this.dirctoryService.findOneById(_id);
    const success = directoryDoc != null ? true : false;
    return {
      success: success,
      result: directoryDoc,
    }
  }
}
