import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AugmentationModule } from 'src/augmentation/augmentation.module';
import { AuthModule } from 'src/auth/auth.module';
import { DirectoryModule } from 'src/directory/directory.module';
import { ServerModule } from 'src/server/server.module';
import { TrainServerModule } from 'src/train-server/train-server.module';
import { TrainingConfigurationModule } from 'src/training-configuration/training-configuration.module';
import { UserModule } from 'src/user/user.module';
import { TrainingController } from './training.controller';
import { Training, TrainingSchema } from './training.schema';
import { TrainingService } from './training.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Training.name, schema: TrainingSchema }]),
    HttpModule,
    DirectoryModule,
    TrainingConfigurationModule,
    AugmentationModule,
    ServerModule,
    UserModule,
    TrainServerModule,
    AuthModule,
  ],
  controllers: [TrainingController],
  providers: [TrainingService],
})
export class TrainingModule {}
