import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { InvitationTypes } from './invitation.enum';
import { Invitation, InvitationCreateInput, InvitationUpdateInput, InvitationWhereUniqueInput } from './invitation.graphql';

@Injectable()
export class InvitationService {
  constructor(
    private prisma: PrismaService
  ) { }
  
  async findMany(where: InvitationWhereUniqueInput): Promise<Invitation[]> {
    return this.prisma.invitation.findMany({ where });
  }

  async create(invitationCreateData: InvitationCreateInput): Promise<Invitation> {
    return this.prisma.invitation.create({
      data: {
        email: invitationCreateData.email,
        status: String(InvitationTypes.SENT),
        Company: {
          connect: {
            id: invitationCreateData.companyId
          }
        }
      }
    })
  }

  async update(invitationUpdateData: InvitationUpdateInput): Promise<Invitation>{
    return this.prisma.invitation.update({
      where: { email_company_id: { email: invitationUpdateData.email, company_id: invitationUpdateData.companyId} },
      data: {
        status: String(invitationUpdateData.status)
      }
    })
  }
}
