import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { InvitationResolver } from './invitation.resolver';
import { InvitationService } from './invitation.service';

// Multiple Invitation
// Update invitation singe resolver

@Module({
  imports: [PrismaModule],
  providers: [InvitationResolver, InvitationService]
})
export class InvitationModule {}
