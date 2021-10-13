import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DirectoryModule } from 'src/directory/directory.module';
import { TestingController } from './testing.controller';
import { Testing, TestingSchema } from './testing.schema';
import { TestingService } from './testing.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Testing.name, schema: TestingSchema }]),
    DirectoryModule,
  ],
  controllers: [TestingController],
  providers: [TestingService]
})
export class TestingModule {}
