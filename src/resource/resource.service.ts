import { Injectable } from '@nestjs/common';

@Injectable()
export class ResourceService {
  constructor() {}

  async getResourceFromTrainServer(serverIndex: number): Promise<any> {
    // httpService.get ~~
    return null;
  }
}
