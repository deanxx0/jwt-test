import { Body, Controller, Get, Param, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiResponseDto } from 'src/api-response.dto';
import { AugmentationService } from 'src/augmentation/augmentation.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { DirectoryService } from 'src/directory/directory.service';
import { TrainingConfigurationService } from 'src/training-configuration/training-configuration.service';
import { PostTrainingDto } from './post-training.dto';
import { TrainingService } from './training.service';

@Controller('training')
@ApiTags('training')
export class TrainingController {
  constructor(
    private trainingService: TrainingService, 
    private directoryService: DirectoryService,
    private trainingConfigurationService: TrainingConfigurationService,
    private augmentationService: AugmentationService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'create training'})
  @ApiBody({ type: PostTrainingDto })
  async createTraining(@Body() postTrainingDto: PostTrainingDto): Promise<ApiResponseDto> {
    console.log(`create training!`);
    const directoryDoc = await this.directoryService.createFromTraining(postTrainingDto);
    const trainingConfigurationDoc = await this.trainingConfigurationService.create(postTrainingDto);
    const augmentationDoc = await this.augmentationService.create(postTrainingDto);
    const createdTrainingDoc = await this.trainingService.create(
      directoryDoc._id, trainingConfigurationDoc._id, augmentationDoc._id, postTrainingDto.name
    );
    const success = createdTrainingDoc != null ? true : false;
    return {
      success: success,
      result: createdTrainingDoc,
    }
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Get(':_id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'get training by id'})
  async findOneById(@Param('_id') _id: string): Promise<ApiResponseDto> {
    console.log(`get training by id!`);
    const findResult = await this.trainingService.findOneById(_id);
    const success = findResult != null ? true : false;
    return {
      success: success,
      result: findResult,
    }
    // 학습 조회
    // id를 기반으로 학습서버에 요청
    // 학습서버의 응답을 필요할 경우 정제하여 프론트에 응답
    // 응답 result dto 따로 필요할듯. 응답 마다 dto가 있어야하는가.
  }
}
