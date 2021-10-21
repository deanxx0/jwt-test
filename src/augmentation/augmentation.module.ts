import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Augmentation, AugmentationSchema } from './augmentation.schema';
import { AugmentationService } from './augmentation.service';
import { AugmentationController } from './augmentation.controller';
import { TrainingModule } from 'src/training/training.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Augmentation.name, schema: AugmentationSchema }]),
    forwardRef(() => TrainingModule),
  ],
  providers: [AugmentationService],
  exports: [AugmentationService],
  controllers: [AugmentationController],
})
export class AugmentationModule {}
