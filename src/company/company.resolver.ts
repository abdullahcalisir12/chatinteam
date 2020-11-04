import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { CompanyService } from './company.service';

import { Company, CompanyWhereUniqueInput, CompanyCreateInput } from './company.graphql';

import { UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/currentUser.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { DeleteResult } from 'src/shared/shared.graphql';

@Resolver(of => Company)
export class CompanyResolver {
  constructor(
    private companyService: CompanyService,
  ) { }

  @Query(returns => Company)
  @UseGuards(JwtAuthGuard)
  async company(
    @CurrentUser() currentUser,
    @Args('companyWhereUniqueInput', { type: () => CompanyWhereUniqueInput }) companyWhereUniqueInput
  ): Promise<Company> {
    return this.companyService.findOne(companyWhereUniqueInput);
  }

  @Mutation(returns => Company)
  @UseGuards(JwtAuthGuard)
  async createCompany(
    @CurrentUser() currentUser,
    @Args('companyCreateInput', { type: () => CompanyCreateInput }) companyCreateInput
  ): Promise<Company> {
    return this.companyService.create(companyCreateInput, currentUser);
  }

  @Mutation(returns => DeleteResult)
  async deleteCompany(@Args('companyWhereUniqueInput', { type: () => CompanyWhereUniqueInput }) companyWhereUniqueInput): Promise<DeleteResult> {
    return this.companyService.delete(companyWhereUniqueInput);
  }
}
