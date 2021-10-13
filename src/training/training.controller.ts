import { Body, Controller, Get, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger';
import { AugmentationDocument } from 'src/augmentation/augmentation.schema';
import { AugmentationService } from 'src/augmentation/augmentation.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { DirectoryDocument } from 'src/directory/directory.schema';
import { DirectoryService } from 'src/directory/directory.service';
import { TrainingConfigurationDocument } from 'src/training-configuration/training-configuration.schema';
import { TrainingConfigurationService } from 'src/training-configuration/training-configuration.service';
import { CreateTrainingDto } from './create-training.dto';
import { PostTrainingDto } from './post-training.dto';
import { TrainingDocument } from './training.schema';
import { TrainingService } from './training.service';

@Controller('training')
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
  async createTraining(@Body() postTrainingDto: PostTrainingDto) {
    console.log(`create training!`);
    const directoryDoc = await this.directoryService.createFromTraining(postTrainingDto);
    const trainingConfigurationDoc = await this.trainingConfigurationService.create(postTrainingDto);
    const augmentationDoc = await this.augmentationService.create(postTrainingDto);
    const createdTrainingDoc = await this.trainingService.create(
      directoryDoc._id, trainingConfigurationDoc._id, augmentationDoc._id, postTrainingDto.name
    );
    const success = 
      directoryDoc && trainingConfigurationDoc && augmentationDoc
      != null || undefined 
      ? true : false;
    return {
      success: success,
      result: createdTrainingDoc,
    }
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Get('byid')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'get training by id'})
  async findOneById(@Query() query: any): Promise<TrainingDocument> {
    console.log(`get training by id!`);
    return this.trainingService.findOneById(query._id);
  }

  
}
