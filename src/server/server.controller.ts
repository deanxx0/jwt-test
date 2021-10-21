import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiResponseDto } from 'src/api-response.dto';
import { PostServerDto } from './post-server.dto';
import { ServerService } from './server.service';

@Controller('server')
@ApiTags('server')
export class ServerController {
  constructor(private serverService: ServerService) {}

  @UsePipes(ValidationPipe)
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'create server info'})
  @ApiBody({ type: PostServerDto })
  async create(@Body() postServerDto: PostServerDto): Promise<ApiResponseDto> {
    console.log(`[server controller] create server info`);
    const createdDoc = await this.serverService.create(postServerDto);
    const success = createdDoc != null ? true : false;
    return {
      success: success,
      result: createdDoc,
    }
  }

  @UsePipes(ValidationPipe)
  @Get(':index')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'get server by index'})
  async getServerByIndex(@Param('index') index: number): Promise<ApiResponseDto> {
    console.log(`[server controller] get server by index`);
    const serverDoc = await this.serverService.findOneByIndex(index);
    const success = serverDoc != null ? true : false;
    return {
      success: success,
      result: serverDoc,
    }
  }
}
