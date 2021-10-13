import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DirectoryModule } from 'src/directory/directory.module';
import { TrainingController } from './training.controller';
import { Training, TrainingSchema } from './training.schema';
import { TrainingService } from './training.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Training.name, schema: TrainingSchema }]),
    DirectoryModule,
  ],
  controllers: [TrainingController],
  providers: [TrainingService],
})
export class TrainingModule {}
