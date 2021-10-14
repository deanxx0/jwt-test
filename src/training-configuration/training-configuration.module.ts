import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TrainingConfiguration, TrainingConfigurationSchema } from './training-configuration.schema';
import { TrainingConfigurationService } from './training-configuration.service';
import { TrainingConfigurationController } from './training-configuration.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TrainingConfiguration.name, schema: TrainingConfigurationSchema }]),
  ],
  providers: [TrainingConfigurationService],
  exports: [TrainingConfigurationService],
  controllers: [TrainingConfigurationController],
})
export class TrainingConfigurationModule {}
