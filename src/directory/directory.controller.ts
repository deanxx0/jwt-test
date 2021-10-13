import { Body, Controller, Get, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { DirectoryDocument } from './directory.schema';
import { DirectoryService } from './directory.service';
import { PostDirectoryDto } from './post-directory.dto';

@Controller('directory')
export class DirectoryController {
  constructor(private directoryService: DirectoryService) {}

  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'create directory '})
  @ApiBody({ type: PostDirectoryDto })
  async createDirectory(@Body() postDirectoryDto: PostDirectoryDto): Promise<DirectoryDocument> {
    console.log(`create directory!`);
    return this.directoryService.create(postDirectoryDto);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Get('byid')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'get directory by id'})
  async findOneById(@Query() query: any): Promise<DirectoryDocument> {
    console.log(`get directory by id!`);
    return this.directoryService.findOneById(query._id);
  }
}
