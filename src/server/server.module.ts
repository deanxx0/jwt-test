import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Server } from 'http';
import { ServerController } from './server.controller';
import { ServerSchema } from './server.schema';
import { ServerService } from './server.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Server.name, schema: ServerSchema }]),
  ],
  controllers: [ServerController],
  providers: [ServerService],
  exports: [ServerService],
})
export class ServerModule {}
