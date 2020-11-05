import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Invitation, InvitationCreateInput, InvitationUpdateInput, InvitationWhereUniqueInput } from './invitation.graphql';
import { InvitationService } from './invitation.service';

@Resolver(of => Invitation)
export class InvitationResolver {
  constructor(private invitationService: InvitationService) { }
  
  @Query(returns => [Invitation])
  async invitations(@Args('invitationWhereUniqueInput', { type: () => InvitationWhereUniqueInput }) invitationWhereUniqueInput): Promise<Invitation[]> {
    return this.invitationService.findMany(invitationWhereUniqueInput);
  }

  // async companyInvitations() {
  //   return 'companyInvitations';
  // }

  // async userInvitations() {
  //   return 'userInvitations';
  // }

  @Mutation(returns => Invitation)
  async createInvitation(@Args('invitationCreateInput', { type: () => InvitationCreateInput }) invitationCreateInput): Promise<Invitation> {
    return this.invitationService.create(invitationCreateInput);
  }

  @Mutation(returns => Invitation)
  async updateInvitation(@Args('invitationUpdateInput', { type: () => InvitationUpdateInput }) invitationUpdateInput): Promise<Invitation> {
    return this.invitationService.update(invitationUpdateInput);
  }
}
