import { Body, Controller, Get, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PostTestingDto } from './post-testing.dto';
import { TestingDocument } from './testing.schema';
import { TestingService } from './testing.service';

@Controller('testing')
export class TestingController {
  constructor(private testingService: TestingService) {}

  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'create testing' })
  @ApiBody({ type: PostTestingDto })
  async createTesting(@Body() postTestingDto: PostTestingDto): Promise<TestingDocument> {
    console.log(`create testing!`);
    return this.testingService.create(postTestingDto);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Get('byid')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'get testing by id'})
  async findOneById(@Query() query: any): Promise<TestingDocument> {
    console.log(`get testing by id!`);
    return this.testingService.findOneById(query._id);
  }
}
