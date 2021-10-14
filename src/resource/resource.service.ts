import { Injectable } from '@nestjs/common';

@Injectable()
export class ResourceService {
  constructor() {}

  async getResourceFromTrainServer(): Promise<any> {
    return null;
  }
}
