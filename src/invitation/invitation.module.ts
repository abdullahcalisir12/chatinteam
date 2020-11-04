import { Module } from '@nestjs/common';
import { InvitationResolver } from './invitation.resolver';
import { InvitationService } from './invitation.service';

@Module({
  providers: [InvitationResolver, InvitationService]
})
export class InvitationModule {}
