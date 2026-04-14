import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
@Injectable()
export class AppService {
  constructor(private users: UsersRepository) {}

  public getUsers() {
    return this.users.findAll();
  }

  public getUserById(id: number) {
    return this.users.findById(id);
  }
}
