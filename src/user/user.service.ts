import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DeleteResult } from 'src/shared/shared.graphql';
import { User, UserWhereUniqueInput, UserCreateInput } from './user.graphql';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService
  ) {}
  async findOne(where: UserWhereUniqueInput): Promise<User> {
    try {
      const user = this.prisma.user.findOne({ where });
      if(!user) throw new Error('User Not Found');
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  async create(data: UserCreateInput): Promise<User> {
    try {
      const createdUser = this.prisma.user.create({ data });
      if (!createdUser) throw new Error('Failed to create user');
      return createdUser;
    } catch (error) {
      throw new Error(error);
    }
  }

  async delete(where: UserWhereUniqueInput): Promise<DeleteResult> {
    try {
      const user = this.findOne(where);
      if (!user) throw new Error('User not found');

      const deletedUser = await this.prisma.user.delete({ where });
      if (!deletedUser) throw new Error('Failed to delete user');
      return { id: where.id };
    } catch (error) {
      throw new Error(error);
    }
  }
}
