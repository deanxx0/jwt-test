import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Augmentation, AugmentationSchema } from './augmentation.schema';
import { AugmentationService } from './augmentation.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Augmentation.name, schema: AugmentationSchema }]),
  ],
  providers: [AugmentationService],
  exports: [AugmentationService],
})
export class AugmentationModule {}
