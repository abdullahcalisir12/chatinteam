import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Invitations } from '@prisma/client';
import { Invitation, InvitationCreateInput, InvitationUpdateInput, InvitationWhereUniqueInput } from './invitation.graphql';
import { InvitationService } from './invitation.service';

@Resolver(of => Invitation)
export class InvitationResolver {
  constructor(private invitationService: InvitationService) { }
  
  @Query(returns => [Invitation])
  async invitations(@Args('invitationWhereUniqueInput', { type: () => InvitationWhereUniqueInput }) invitationWhereUniqueInput): Promise<Invitations[]> {
    return this.invitationService.findMany(invitationWhereUniqueInput);
  }

  @Mutation(returns => Invitation)
  async createInvitation(@Args('invitationCreateInput', { type: () => InvitationCreateInput }) invitationCreateInput): Promise<Invitations> {
    return this.invitationService.create(invitationCreateInput);
  }

  @Mutation(returns => Invitation)
  async updateInvitation(@Args('invitationUpdateInput', { type: () => InvitationUpdateInput }) invitationUpdateInput): Promise<Invitations> {
    return this.invitationService.update(invitationUpdateInput);
  }
}
