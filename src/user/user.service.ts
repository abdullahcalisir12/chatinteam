import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User, UserWhereUniqueInput, UserCreateInput } from './user.graphql';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService
  ) {}
  async findOne(where: UserWhereUniqueInput): Promise<User> {
    return this.prisma.users.findOne({ where })
  }

  async create(userCreateData: UserCreateInput): Promise<User> {
    return this.prisma.users.create({
      data: userCreateData
    })
  }

  async delete(where: UserWhereUniqueInput): Promise<User> {
    return this.prisma.users.delete({ where });
  }
}
