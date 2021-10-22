import { Controller, Get, Param, UseGuards, Request, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ApiResponseDto } from 'src/api-response.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { TrainServerService } from 'src/train-server/train-server.service';
import { UserService } from 'src/user/user.service';

@Controller('resources')
export class ResourceController {
  constructor(
    private userService: UserService,
    private trainServerService: TrainServerService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Get(':serverIndex')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'get resources' })
  async getResourceBy_id(@Request() req, @Param('serverIndex') serverIndex: number): Promise<ApiResponseDto> {
    console.log(`[resource controller] getResourceBy_id`);
    const userDoc = await this.userService.findOne(req.user.username);
    const serverResources = await this.trainServerService.getResources(userDoc.serverindex);
    const success = serverResources != null ? true : false;
    return {
      success: success,
      result: serverResources,
    }
  }
}
