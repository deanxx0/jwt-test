import { Body, Controller, Get, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ApiResponseDto } from 'src/api-response.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ResourceService } from './resource.service';

@Controller('resources')
export class ResourceController {
  constructor(
    private resourceService: ResourceService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'get resources' })
  async getResourceBy_id(@Body() serverIndexObj): Promise<ApiResponseDto> {
    console.log(`[resource controller] get resources by id!`);
    const serverIndex: number = serverIndexObj.serverIndex;
    const resourcesDoc = await this.resourceService.getResourceFromTrainServer(serverIndex);
    const success = resourcesDoc != null ? true : false;
    return {
      success: success,
      result: resourcesDoc,
    }
  }
}
