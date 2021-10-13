import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTestingDto } from './create-testing.dto';
import { PostTestingDto } from './post-testing.dto';
import { Testing, TestingDocument } from './testing.schema';
import { ObjectID } from 'bson';

@Injectable()
export class TestingService {
  constructor(
    @InjectModel(Testing.name) private testingModel: Model<TestingDocument>,
  ) {}

  async create(directoryDoc_id: string, postTestingDto: PostTestingDto): Promise<TestingDocument> {
    const createTestingDto = this.buildCreateTestingDto(directoryDoc_id, postTestingDto);
    const createdDoc = new this.testingModel(createTestingDto);
    return createdDoc.save();
  }

  async findOneById(_id: string): Promise<TestingDocument> {
    return this.testingModel.findOne({ _id: _id }).exec();
  }
  
  buildCreateTestingDto(directoryDoc_id: string, postTestingDto: PostTestingDto): CreateTestingDto {
    return {
      _id: (new ObjectID()).toString(),
      name: postTestingDto.name,
      directoryId: directoryDoc_id,
      trainId: postTestingDto.trainId,
    }
  }
}
