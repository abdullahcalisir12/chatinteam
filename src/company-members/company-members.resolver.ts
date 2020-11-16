import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, ID, Int } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PrismaService } from 'src/prisma/prisma.service';

import { User } from 'src/user/user.graphql';

@Resolver(() => User)
@UseGuards(JwtAuthGuard)
export class CompanyMembersResolver {
  constructor(
    private prisma: PrismaService
  ) { }

  @Query(() => [User], { name: 'companyMembers' })
  async companyMembers(@Args('companyId', { type: () => Int }) companyId): Promise<User[]> {
    const members = await this.prisma.companyMember.findMany({
      where: {
        company_id: companyId
      },
      include: {
        User: true
      }
    });
    return members.map(member => member.User);
  }
}
