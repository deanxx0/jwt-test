import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Directory, DirectorySchema } from './directory.schema';
import { DirectoryService } from './directory.service';
import { DirectoryController } from './directory.controller';
import { TrainingModule } from 'src/training/training.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Directory.name, schema: DirectorySchema }]),
    forwardRef(() => TrainingModule),
  ],
  providers: [DirectoryService],
  exports: [DirectoryService],
  controllers: [DirectoryController],
})
export class DirectoryModule {}
