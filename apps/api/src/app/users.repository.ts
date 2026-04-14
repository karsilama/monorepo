import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDomainModel } from '@users/infrastructure';
import { Model } from 'mongoose';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  /**
   * Find user by ID
   */
  async findById(id: number): Promise<UserDomainModel | null> {
    return this.userModel.findOne({ id }).lean().exec();
  }

  /**
   * Find all users
   */
  async findAll(): Promise<UserDomainModel[]> {
    return this.userModel.find().lean().exec();
  }

  /**
   * Find user by email
   */
  async findByEmail(email: string): Promise<UserDomainModel | null> {
    return this.userModel.findOne({ email }).lean().exec();
  }

  /**
   * Find users by role
   */
  async findByRole(
    role: 'admin' | 'moderator' | 'user',
  ): Promise<UserDomainModel[]> {
    return this.userModel.find({ role }).lean().exec();
  }

  /**
   * Create new user
   */
  async create(user: UserDomainModel): Promise<UserDomainModel> {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  /**
   * Update user
   */
  async update(
    id: number,
    user: Partial<UserDomainModel>,
  ): Promise<UserDomainModel | null> {
    return this.userModel
      .findOneAndUpdate({ id }, user, { new: true })
      .lean()
      .exec();
  }

  /**
   * Delete user
   */
  async delete(id: number): Promise<void> {
    await this.userModel.deleteOne({ id }).exec();
  }

  /**
   * Count total users
   */
  async count(): Promise<number> {
    return this.userModel.countDocuments().exec();
  }
}
