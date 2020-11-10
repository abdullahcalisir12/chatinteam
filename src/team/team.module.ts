import { Module } from '@nestjs/common';
import { CompanyModule } from 'src/company/company.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TeamResolver } from './team.resolver';
import { TeamService } from './team.service';

// teams resolver
// delete team resolver

@Module({
  imports: [PrismaModule, CompanyModule],
  providers: [TeamResolver, TeamService]
})
export class TeamModule {}
