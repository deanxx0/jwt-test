import { Module } from '@nestjs/common';
import { TrainServerModule } from 'src/train-server/train-server.module';
import { UserModule } from 'src/user/user.module';
import { ResourceController } from './resource.controller';
import { ResourceService } from './resource.service';

@Module({
  imports: [
    UserModule,
    TrainServerModule,
  ],
  controllers: [ResourceController],
  providers: [ResourceService]
})
export class ResourceModule {}
