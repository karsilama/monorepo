import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  public getUsers() {
    return {
      users: [],
    };
  }

  public getUserById(id: string) {
    return {
      users: [],
    };
  }
}
