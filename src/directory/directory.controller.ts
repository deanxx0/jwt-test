import { Controller, Get, Param, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ApiResponseDto } from 'src/api-response.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { TrainingService } from 'src/training/training.service';
import { DirectoryService } from './directory.service';

@Controller('directories')
export class DirectoryController {
  constructor(
    private dirctoryService: DirectoryService,
    private trainingSevice: TrainingService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Get(':trainId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'get directory' })
  async getDirectoriesBy_id(@Param('trainId') trainId: string): Promise<ApiResponseDto> {
    console.log(`[directory controller] getDirectoriesBy_id`);
    const trainDoc = await this.trainingSevice.findTrainingBy_id(trainId);
    const directoryDoc = await this.dirctoryService.findOneById(trainDoc.directoryId);
    const success = directoryDoc != null ? true : false;
    return {
      success: success,
      result: directoryDoc,
    }
  }
}
