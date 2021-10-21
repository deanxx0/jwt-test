import { Controller, Get, Param, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ApiResponseDto } from 'src/api-response.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { TrainingService } from 'src/training/training.service';
import { TrainingConfigurationService } from './training-configuration.service';

@Controller('configurations')
export class TrainingConfigurationController {
  constructor(
    private trainingConfigurationService: TrainingConfigurationService,
    private trainingSevice: TrainingService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Get(':trainId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'get training configurations' })
  async getConfigurationsBy_id(@Param('trainId') trainId: string): Promise<ApiResponseDto> {
    console.log(`[configurations controller] getConfigurationsBy_id`);
    const trainDoc = await this.trainingSevice.findTrainingBy_id(trainId);
    const configurationDoc = await this.trainingConfigurationService.findOneById(trainDoc.configurationId);
    const success = configurationDoc != null ? true : false;
    return {
      success: success,
      result: configurationDoc,
    }
  }
}
