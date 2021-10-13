import { Body, Controller, Get, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PostTrainingDto } from './post-training.dto';
import { TrainingDocument } from './training.schema';
import { TrainingService } from './training.service';

@Controller('training')
export class TrainingController {
  constructor(private trainingService: TrainingService) {}

  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'create training'})
  @ApiBody({ type: PostTrainingDto })
  async createTraining(@Body() postTrainingDto: PostTrainingDto): Promise<TrainingDocument> {
    console.log(`create training!`);
    return this.trainingService.create(postTrainingDto);
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
