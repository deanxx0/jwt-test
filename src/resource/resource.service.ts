import { Injectable } from '@nestjs/common';

@Injectable()
export class ResourceService {
  constructor() {}

  async getResourceFromTrainServer(serverIndex: number): Promise<any> {
    console.log(`[resource service] getResourceFromTrainServer`);
    // httpService.get ~~
    return null;
  }
}
