import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { InvitationResolver } from './invitation.resolver';
import { InvitationService } from './invitation.service';

@Module({
  imports: [PrismaModule],
  providers: [InvitationResolver, InvitationService]
})
export class InvitationModule {}
