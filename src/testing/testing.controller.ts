import { Body, Controller, Get, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { DirectoryService } from 'src/directory/directory.service';
import { PostTestingDto } from './post-testing.dto';
import { TestingDocument } from './testing.schema';
import { TestingService } from './testing.service';

@Controller('testing')
export class TestingController {
  constructor(
    private testingService: TestingService,
    private directoryService: DirectoryService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'create testing' })
  @ApiBody({ type: PostTestingDto })
  async createTesting(@Body() postTestingDto: PostTestingDto) {
    console.log(`create testing!`);
    const directoryDoc = await this.directoryService.createFromTesting(postTestingDto);
    const createdTestingDoc = await this.testingService.create(
      directoryDoc._id,
      postTestingDto,
    );
    const success = directoryDoc != null || undefined ? true : false;
    return {
      success: success,
      result: createdTestingDoc,
    }
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
