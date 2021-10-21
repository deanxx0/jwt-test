import { Controller, Get, Param, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ApiResponseDto } from 'src/api-response.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { TrainingConfigurationService } from './training-configuration.service';

@Controller('configurations')
export class TrainingConfigurationController {
  constructor(
    private trainingConfigurationService: TrainingConfigurationService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Get(':_id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'get training configurations' })
  async getConfigurationsBy_id(@Param('_id') _id: string): Promise<ApiResponseDto> {
    console.log(`[configurations controller] get configurations by id!`);
    const configurationDoc = await this.trainingConfigurationService.findOneById(_id);
    const success = configurationDoc != null ? true : false;
    return {
      success: success,
      result: configurationDoc,
    }
  }
}
