import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DeleteResult } from 'src/shared/shared.graphql';
import { User } from 'src/user/user.graphql';
import { Team, TeamWhereUniqueInput, TeamCreateInput } from './team.graphql';

@Injectable()
export class TeamService {
  constructor(
    private prisma: PrismaService
  ) {}
  async findOne(where: TeamWhereUniqueInput): Promise<Team> {
    return this.prisma.team.findOne({ where });
  }

  async create(teamCreateData: TeamCreateInput, user: User): Promise<Team> {
    const { company_id, ...teamData } = teamCreateData;
    return this.prisma.team.create({
      data: {
        ...teamData,
        Company: {
          connect: {
            id: company_id
          }
        },
        TeamMember: {
          create: {
            User: { connect: { id: user.id }}
          }
        }
      }
    });
  }

  async delete(where: TeamWhereUniqueInput): Promise<DeleteResult> {
    const team = await this.prisma.team.delete({ where });
    if (!team) throw new Error();
    return { id: where.id }
  }
}
