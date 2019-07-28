import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  getTeste(): string {
    return 'teste';
  }
}
