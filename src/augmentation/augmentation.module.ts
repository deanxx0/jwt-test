import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Augmentation, AugmentationSchema } from './augmentation.schema';
import { AugmentationService } from './augmentation.service';
import { AugmentationController } from './augmentation.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Augmentation.name, schema: AugmentationSchema }]),
  ],
  providers: [AugmentationService],
  exports: [AugmentationService],
  controllers: [AugmentationController],
})
export class AugmentationModule {}
