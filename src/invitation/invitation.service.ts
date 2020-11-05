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
    try {
      return this.prisma.invitation.findMany({ where });
    } catch (error) {
      throw new Error(error);
    }
  }

  async create(invitationCreateData: InvitationCreateInput): Promise<Invitation> {
    try {
      const invitation = await this.prisma.invitation.findOne({
        where: { email_company_id: { email: invitationCreateData.email, company_id: invitationCreateData.companyId } }
      });
      if (invitation.status === 'SENT') throw new Error('There is already an invitation');
      if (invitation.status === 'ACCEPTED') throw new Error('The user who is using this email address is already a team member');

      if (invitation && invitation.status === 'REJECTED' || invitation.status === 'CANCELED') {
        this.update({ ...invitationCreateData, status: 'SENT' });
      }

      if (!invitation) {
        const createdInvitation = await this.prisma.invitation.create({
          data: {
            email: invitationCreateData.email,
            status: String(InvitationTypes.SENT),
            Company: {
              connect: {
                id: invitationCreateData.companyId
              }
            }
          }
        });
        if (!createdInvitation) throw new Error('Failed to create invitation');
        return createdInvitation;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(invitationUpdateData: InvitationUpdateInput): Promise<Invitation>{
    try {
      const invitation = await this.prisma.invitation.findOne({
        where: { email_company_id: { email: invitationUpdateData.email, company_id: invitationUpdateData.companyId } }
      });
      if (!invitation) throw new Error('Invitation Not Found');
      const updatedInvitation = await this.prisma.invitation.update({
        where: { email_company_id: { email: invitationUpdateData.email, company_id: invitationUpdateData.companyId } },
        data: {
          status: String(invitationUpdateData.status)
        }
      });
      if (!updatedInvitation) throw new Error('Failed to create invitation');
      return updatedInvitation;
    } catch (error) {
      throw new Error(error);
    }
  }
}
