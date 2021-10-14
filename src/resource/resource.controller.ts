import { Controller, Get, Param, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
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
  @Get(':_id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'get resources' })
  async getResourceBy_id(): Promise<ApiResponseDto> {
    console.log(`get resources by id!`);
    const resourcesDoc = await this.resourceService.getResourceFromTrainServer();
    const success = resourcesDoc != null ? true : false;
    return {
      success: success,
      result: resourcesDoc,
    }
  }
}
