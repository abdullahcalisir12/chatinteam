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
    return this.prisma.user.findOne({ where });
  }

  async create(data: UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async delete(where: UserWhereUniqueInput): Promise<DeleteResult> {
    const user = await this.prisma.user.delete({ where });
    if (!user) throw new Error('Error');
    return { id: where.id };
  }
}
