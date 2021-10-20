import { Body, Controller, Delete, Get, Param, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
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
    const serverId: string = await this.trainingService.postTrain(postTrainingDto);
    const createdTrainingDoc = await this.trainingService.create(
      directoryDoc._id, trainingConfigurationDoc._id, augmentationDoc._id, postTrainingDto.name, serverId
    );
    const success = createdTrainingDoc != null ? true : false;
    return {
      success: success,
      result: createdTrainingDoc,
    }
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Delete(':_id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'delete training by id'})
  async deleteTrainingBy_id(@Param('_id') _id: string): Promise<ApiResponseDto> {
    console.log(`delete training by id!`);
    const deletedTrainingDoc = await this.trainingService.deleteTrainingBy_id(_id);
    const success = deletedTrainingDoc != null ? true : false;
    return {
      success: success,
      result: deletedTrainingDoc,
    }
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Get(':_id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'get training by id'})
  async getTrainingBy_id(@Param('_id') _id: string): Promise<ApiResponseDto> {
    console.log(`get training by id!`);
    //const findResult = await this.trainingService.findOneById(_id);
    const trainServerResponseData = await this.trainingService.getTrainInfoFromTrainServer(_id);
    console.log(`trainServerResponse: ${trainServerResponseData}`);
    const success = trainServerResponseData != null ? true : false;
    return {
      success: success,
      result: trainServerResponseData,
    }
  }
}
