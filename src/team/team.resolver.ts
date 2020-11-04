import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { DeleteResult } from 'src/shared/shared.graphql';
import { Team, TeamCreateInput, TeamWhereUniqueInput } from './team.graphql';
import { TeamService } from './team.service';

@Resolver(of => Team)
export class TeamResolver {
  constructor(
    private teamService: TeamService,
  ) { }
  
  @Query(returns => Team)  
  @UseGuards(JwtAuthGuard)
  async team(@Args('teamWhereUniqueInput', { type: () => TeamWhereUniqueInput }) teamWhereUniqueInput): Promise<Team> {
    return this.teamService.findOne(teamWhereUniqueInput);
  }

  @Mutation(returns => Team)  
  @UseGuards(JwtAuthGuard)
  async createTeam(@Args('teamCreateInput', { type: () => TeamCreateInput }) teamCreateInput): Promise<Team> {
    return this.teamService.create(teamCreateInput);
  }

  @Mutation(returns => DeleteResult)
  @UseGuards(JwtAuthGuard)
  async deleteTeam(@Args('teamWhereUniqueInput', { type: () => TeamWhereUniqueInput }) teamWhereUniqueInput): Promise<DeleteResult> {
    return this.teamService.delete(teamWhereUniqueInput);
  }
}
