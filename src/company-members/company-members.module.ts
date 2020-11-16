import { Module } from '@nestjs/common';
import { CompanyMembersResolver } from './company-members.resolver';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [CompanyMembersResolver]
})
export class CompanyMembersModule {}
