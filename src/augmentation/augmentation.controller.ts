import { Controller, Get, Param, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ApiResponseDto } from 'src/api-response.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { TrainingService } from 'src/training/training.service';
import { AugmentationService } from './augmentation.service';

@Controller('augmentations')
export class AugmentationController {
  constructor(
    private augmentationService: AugmentationService,
    private trainingSevice: TrainingService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Get(':trainId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'get augmentations' })
  async getAugmentationsBy_id(@Param('trainId') trainId: string): Promise<ApiResponseDto> {
    console.log(`[augmentation controller] getAugmentationsBy_id`);
    const trainDoc = await this.trainingSevice.findTrainingBy_id(trainId);
    const augmentationDoc = await this.augmentationService.findOneById(trainDoc.augmentationId);
    const success = augmentationDoc != null ? true : false;
    return {
      success: success,
      result: augmentationDoc,
    }
  }
}
