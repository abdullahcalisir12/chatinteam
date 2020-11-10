import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Company } from 'src/company/company.graphql';
import { DeleteResult } from 'src/shared/shared.graphql';
import { Team, TeamCreateInput, TeamWhereUniqueInput } from './team.graphql';
import { TeamService } from './team.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/user/user.graphql';
import { CurrentUser } from 'src/auth/currentUser.decorator';

@Resolver(of => Team)
@UseGuards(JwtAuthGuard)
export class TeamResolver {
  constructor(
    private teamService: TeamService,
    private prismaService: PrismaService
  ) { }
  
  @Query(returns => Team)  
  async team(@Args('teamWhereUniqueInput', { type: () => TeamWhereUniqueInput }) teamWhereUniqueInput): Promise<Team> {
    return this.teamService.findOne(teamWhereUniqueInput);
  }

  @Mutation(returns => Team)
  async createTeam(
    @CurrentUser() currentUser,
    @Args('teamCreateInput', { type: () => TeamCreateInput }) teamCreateInput
  ): Promise<Team> {
    return this.teamService.create(teamCreateInput, currentUser);
  }

  @Mutation(returns => DeleteResult)
  async deleteTeam(@Args('teamWhereUniqueInput', { type: () => TeamWhereUniqueInput }) teamWhereUniqueInput): Promise<DeleteResult> {
    return this.teamService.delete(teamWhereUniqueInput);
  }

  @ResolveField('company', returns => Company)
  async company(@Parent() team: Team) {
    const { id } = team;
    return this.prismaService.company.findOne({ where: { id }});
  }

  @ResolveField('members', returns => [User])
  async members(@Parent() team: Team) {
    const { id } = team;
    const teamMembers = await this.prismaService.teamMember.findMany({ where: { team_id: id }, select: { User: true } });
    console.log(teamMembers);
    return teamMembers.map(member => member.User);
  }
}
