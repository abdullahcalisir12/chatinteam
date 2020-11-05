import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/currentUser.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Company } from 'src/company/company.graphql';
import { PrismaService } from 'src/prisma/prisma.service';
import { Invitation, UpdateInvitation, InvitationCreateInput, InvitationUpdateInput, InvitationWhereUniqueInput } from './invitation.graphql';
import { InvitationService } from './invitation.service';

@Resolver(of => Invitation)
@UseGuards(JwtAuthGuard)
export class InvitationResolver {
  constructor(
    private invitationService: InvitationService,
    private prismaService: PrismaService
  ) { }
  
  @Query(returns => [Invitation])
  async companyInvitations(@Args('invitationWhereUniqueInput', { type: () => InvitationWhereUniqueInput }) invitationWhereUniqueInput): Promise<Invitation[]> {
    return this.invitationService.findMany({ company_id: invitationWhereUniqueInput.company_id });
  }

  @Query(returns => [Invitation])
  async userInvitations(@Args('invitationWhereUniqueInput', { type: () => InvitationWhereUniqueInput }) invitationWhereUniqueInput): Promise<Invitation[]> {
    return this.invitationService.findMany({ email: invitationWhereUniqueInput.email });
  }

  @Mutation(returns => Invitation)
  async createInvitation(@Args('invitationCreateInput', { type: () => InvitationCreateInput }) invitationCreateInput): Promise<Invitation> {
    return this.invitationService.create(invitationCreateInput);
  }

  @Mutation(returns => UpdateInvitation)
  async cancelInvitation(
    @CurrentUser() currentUser,
    @Args('invitationUpdateInput', { type: () => InvitationUpdateInput }) invitationUpdateInput
  ): Promise<Invitation> {
    return this.invitationService.cancel(invitationUpdateInput, currentUser);
  }

  @Mutation(returns => UpdateInvitation)
  async acceptInvitation(
    @CurrentUser() currentUser,
    @Args('invitationUpdateInput', { type: () => InvitationUpdateInput }) invitationUpdateInput
  ): Promise<Invitation> {
    return this.invitationService.accept(invitationUpdateInput, currentUser);
  }

  @Mutation(returns => UpdateInvitation)
  async rejectInvitation(
    @CurrentUser() currentUser,
    @Args('invitationUpdateInput', { type: () => InvitationUpdateInput }) invitationUpdateInput
  ): Promise<Invitation> {
    return this.invitationService.reject(invitationUpdateInput, currentUser);
  }


  @ResolveField('company', returns => Company)
  async company(@Parent() invitation: Invitation) {
    const { company_id } = invitation;
    return this.prismaService.company.findOne({ where: { id: company_id}});
  }
}
