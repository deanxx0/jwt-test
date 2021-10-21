import { Module } from '@nestjs/common';
import { TrainServerService } from './train-server.service';

@Module({
  providers: [TrainServerService],
  exports: [TrainServerService],
})
export class TrainServerModule {}
