import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Directory, DirectorySchema } from './directory.schema';
import { DirectoryService } from './directory.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Directory.name, schema: DirectorySchema }]),
  ],
  providers: [DirectoryService],
  exports: [DirectoryService],
})
export class DirectoryModule {}
