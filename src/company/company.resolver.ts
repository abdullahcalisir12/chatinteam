import { Resolver, Query, Mutation, Args, ID, ResolveField, Parent } from '@nestjs/graphql';
import { CompanyService } from './company.service';

import { Company, CompanyWhereUniqueInput, CompanyCreateInput } from './company.graphql';

import { UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/currentUser.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { DeleteResult } from 'src/shared/shared.graphql';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/user/user.graphql';
import { Team } from 'src/team/team.graphql';
import { Invitation } from 'src/invitation/invitation.graphql';

@Resolver(of => Company)
@UseGuards(JwtAuthGuard)
export class CompanyResolver {
  constructor(
    private companyService: CompanyService,
    private prismaService: PrismaService
  ) { }

  @Query(returns => Company)
  async company(
    @CurrentUser() currentUser,
    @Args('companyWhereUniqueInput', { type: () => CompanyWhereUniqueInput }) companyWhereUniqueInput
  ): Promise<Company> {
    return this.companyService.findOne(companyWhereUniqueInput);
  }

  @Mutation(returns => Company)
  async createCompany(
    @CurrentUser() currentUser,
    @Args('companyCreateInput', { type: () => CompanyCreateInput }) companyCreateInput
  ): Promise<Company> {
    return this.companyService.create(companyCreateInput, currentUser);
  }

  @Mutation(returns => DeleteResult)
  async deleteCompany(
    @CurrentUser() currentUser,
    @Args('companyWhereUniqueInput', { type: () => CompanyWhereUniqueInput }) companyWhereUniqueInput
  ): Promise<DeleteResult> {
    return this.companyService.delete(companyWhereUniqueInput, currentUser);
  }

  @ResolveField('owner', returns => User)
  async owner(@Parent() company: Company) {
    const { id } = company;
    return this.prismaService.user.findOne({ where: { id }});
  }

  @ResolveField('teams', returns => [Team])
  async teams(@Parent() company: Company) {
    const { id } = company;
    const teams = await this.prismaService.team.findMany({ where: { company_id: id } });
    return teams;
  }

  @ResolveField('members', returns => [User])
  async members(@Parent() company: Company) {
    const { id } = company;
    const companyMembers = await this.prismaService.companyMember.findMany({ where: { company_id: id }, select: { User: true } });

    return companyMembers.map(member => member.User);
  }

  @ResolveField('invitations', returns => [Invitation])
  async invitations(@Parent() company: Company) {
    const { id } = company;
    return this.prismaService.invitation.findMany({ where: { company_id: id }});
  }
}
