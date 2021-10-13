import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TrainingModule } from './training/training.module';
import { TestingModule } from './testing/testing.module';
import { DirectoryModule } from './directory/directory.module';
import { TrainingConfigurationModule } from './training-configuration/training-configuration.module';
import { AugmentationModule } from './augmentation/augmentation.module';

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://db-admin:laon0118@10.101.0.44:27017/ts?authSource=admin`),
    AuthModule, 
    UsersModule, 
    UserModule, 
    TrainingModule,
    TestingModule,
    DirectoryModule,
    TrainingConfigurationModule,
    AugmentationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
