import { Controller, Get, Param, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ApiResponseDto } from 'src/api-response.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AugmentationService } from './augmentation.service';

@Controller('augmentations')
export class AugmentationController {
  constructor(
    private augmentationService: AugmentationService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Get(':_id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'get augmentations' })
  async getAugmentationsBy_id(@Param('_id') _id: string): Promise<ApiResponseDto> {
    console.log(`[augmentation controller] get augmentations by id!`);
    const augmentationDoc = await this.augmentationService.findOneById(_id);
    const success = augmentationDoc != null ? true : false;
    return {
      success: success,
      result: augmentationDoc,
    }
  }
}
