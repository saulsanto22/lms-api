import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): number {

    let a = 10
    return a;
  }
}
