import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://db-admin:laon0118@10.101.0.44:27017/ts?authSource=admin`),
    AuthModule, 
    UsersModule, 
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
