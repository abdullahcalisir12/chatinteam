import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DeleteResult } from 'src/shared/shared.graphql';
import { Team, TeamWhereUniqueInput, TeamCreateInput } from './team.graphql';

@Injectable()
export class TeamService {
  constructor(
    private prisma: PrismaService
  ) {}
  async findOne(where: TeamWhereUniqueInput): Promise<Team> {
    return this.prisma.teams.findOne({ where });
  }

  async create(teamCreateData: TeamCreateInput): Promise<Team> {
    const { companyId, ...teamData } = teamCreateData
    return this.prisma.teams.create({
      data: {
        ...teamData,
        Companies: {
          connect: {
            id: companyId
          }
        }
      }
    });
  }

  async delete(where: TeamWhereUniqueInput): Promise<DeleteResult> {
    const team = await this.prisma.teams.delete({ where });
    if (!team) throw new Error();
    return { id: where.id }
  }
}
