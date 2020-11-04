import { Injectable } from '@nestjs/common';
import { Invitations } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { InvitationTypes } from './invitation.enum';
import { InvitationCreateInput, InvitationUpdateInput, InvitationWhereUniqueInput } from './invitation.graphql';

@Injectable()
export class InvitationService {
  constructor(
    private prisma: PrismaService
  ) { }
  
  async findMany(where: InvitationWhereUniqueInput): Promise<Invitations[]> {
    return this.prisma.invitations.findMany({ where, select: { email: true, companyId: true, status: true } });
  }

  async create(invitationCreateData: InvitationCreateInput): Promise<Invitations> {
    return this.prisma.invitations.create({
      data: {
        email: invitationCreateData.email,
        status: String(InvitationTypes.SENT),
        Companies: {
          connect: {
            id: invitationCreateData.companyId
          }
        }
      }
    })
  }

  async update(invitationUpdateData: InvitationUpdateInput): Promise<Invitations>{
    return this.prisma.invitations.update({
      where: { Invitations_email_companyId_key: { email: invitationUpdateData.email, companyId: invitationUpdateData.companyId} },
      data: {
        status: String(invitationUpdateData.status)
      }
    })
  }
}
