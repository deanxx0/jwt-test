import { Body, Controller, Delete, Get, Request, Param, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiResponseDto } from 'src/api-response.dto';
import { AugmentationService } from 'src/augmentation/augmentation.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { DirectoryService } from 'src/directory/directory.service';
import { ServerService } from 'src/server/server.service';
import { TrainServerService } from 'src/train-server/train-server.service';
import { TrainingConfigurationService } from 'src/training-configuration/training-configuration.service';
import { UserService } from 'src/user/user.service';
import { PostTrainingDto } from './post-training.dto';
import { ResponseTrainingDto } from './response-training.dto';
import { TrainingDocument } from './training.schema';
import { TrainingService } from './training.service';

@Controller('training')
@ApiTags('training')
export class TrainingController {
  constructor(
    private trainingService: TrainingService, 
    private directoryService: DirectoryService,
    private trainingConfigurationService: TrainingConfigurationService,
    private augmentationService: AugmentationService,
    private userService: UserService,
    private trainServerService: TrainServerService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'create training'})
  @ApiBody({ type: PostTrainingDto })
  async createTraining(@Request() req, @Body() postTrainingDto: PostTrainingDto): Promise<ApiResponseDto> {
    console.log(`create training!`);
    const directoryDoc = await this.directoryService.createFromTraining(postTrainingDto);
    const trainingConfigurationDoc = await this.trainingConfigurationService.create(postTrainingDto);
    const augmentationDoc = await this.augmentationService.create(postTrainingDto);
    const userDoc = await this.userService.findOne(req.user.username);
    const serverIndex = userDoc.serverindex;
    const serverId: string = await this.trainServerService.postTrain(serverIndex, postTrainingDto);
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
  async getTrainingBy_id(@Request() req, @Param('_id') _id: string): Promise<ApiResponseDto> {
    console.log(`get training by id!`);
    const trainingDoc = await this.trainingService.findTrainingBy_id(_id);
    const userDoc = await this.userService.findOne(req.user.username);
    console.log(`userDoc.serverindex: ${userDoc.serverindex}, trainingDoc.serverId: ${trainingDoc.serverId}`);
    const trainStatus = await this.trainServerService.getTrainStatusFromTrainServer(userDoc.serverindex, trainingDoc.serverId);
    console.log(`trainStatus: ${trainStatus}`);
    const trainMetrics = await this.trainServerService.getMetricsFromTrainServer(userDoc.serverindex, trainingDoc.serverId);
    const responseTrainingResult = this.buildResponseTrainingDto(trainingDoc, trainStatus, trainMetrics);
    const success = trainMetrics != null ? true : false;
    return {
      success: success,
      result: responseTrainingResult,
    }
  }

  // @UseGuards(JwtAuthGuard)
  // @UsePipes(ValidationPipe)
  // @Get('pages/:pageNo')
  // @ApiBearerAuth()
  // @ApiOperation({ summary: 'get training pages'})
  // async getTrainingPages(@Request() req, @Param('pageNo') pageNo: number): Promise<ApiResponseDto> {

  // }

  buildResponseTrainingDto(trainingDoc, trainStatus, trainMetrics): ResponseTrainingDto {
    return {
      id: trainingDoc._id,
      name: trainingDoc.name,
      status: trainStatus,
      progress: trainMetrics.iteration / trainMetrics.max_iteration,
      createdAt: trainingDoc.createdAt,
      train_loss: trainMetrics.train_loss,
      test_loss: trainMetrics.test_loss,
      test_accuracy: trainMetrics.test_accuracy,
      iou: trainMetrics.test_accuracy2,
      iteration: trainMetrics.iteration,
      max_iteration: trainMetrics.max_iteration,
      directoryId: trainingDoc.directoyId,
      configurationId: trainingDoc.configurationId,
      augmentationId: trainingDoc.augmentationId,
    }
  }
}
