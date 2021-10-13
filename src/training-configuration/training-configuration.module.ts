import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TrainingConfiguration, TrainingConfigurationSchema } from './training-configuration.schema';
import { TrainingConfigurationService } from './training-configuration.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TrainingConfiguration.name, schema: TrainingConfigurationSchema }]),
  ],
  providers: [TrainingConfigurationService],
  exports: [TrainingConfigurationService],
})
export class TrainingConfigurationModule {}
