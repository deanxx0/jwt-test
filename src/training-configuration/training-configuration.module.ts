import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TrainingConfiguration, TrainingConfigurationSchema } from './training-configuration.schema';
import { TrainingConfigurationService } from './training-configuration.service';
import { TrainingConfigurationController } from './training-configuration.controller';
import { TrainingModule } from 'src/training/training.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TrainingConfiguration.name, schema: TrainingConfigurationSchema }]),
    forwardRef(() => TrainingModule),
  ],
  providers: [TrainingConfigurationService],
  exports: [TrainingConfigurationService],
  controllers: [TrainingConfigurationController],
})
export class TrainingConfigurationModule {}
