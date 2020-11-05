import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { CompanyService } from './company.service';

import { Company, CompanyWhereUniqueInput, CompanyCreateInput, CompanyWhereInput } from './company.graphql';

import { UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/currentUser.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { DeleteResult } from 'src/shared/shared.graphql';

@Resolver(of => Company)
@UseGuards(JwtAuthGuard)
export class CompanyResolver {
  constructor(
    private companyService: CompanyService,
  ) { }

  @Query(returns => Company)
  async company(
    @CurrentUser() currentUser,
    @Args('companyWhereUniqueInput', { type: () => CompanyWhereUniqueInput }) companyWhereUniqueInput
  ): Promise<Company> {
    return this.companyService.findOne(companyWhereUniqueInput);
  }

  @Query(returns => [Company])
  async companies(
    @CurrentUser() currentUser,
    @Args('companyWhereInput', { type: () => CompanyWhereInput }) companyWhereInput
  ): Promise<Company[]> {
    return this.companyService.findMany(companyWhereInput);
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
}
