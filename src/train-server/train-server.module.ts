import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Server, ServerSchema } from 'src/server/server.schema';
import { TrainServerService } from './train-server.service';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: Server.name, schema: ServerSchema }]),
    HttpModule,
  ],
  providers: [TrainServerService],
  exports: [TrainServerService],
})
export class TrainServerModule {}
