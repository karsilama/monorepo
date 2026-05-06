import { Injectable } from "@nestjs/common";
import { UserRepository } from "./user.repository";

@Injectable()
export class UserService {
  constructor(private users: UserRepository) {}

  public getUsers() {
    return this.users.findAll();
  }

  public getUserById(id: number) {
    return this.users.findById(id);
  }
}
