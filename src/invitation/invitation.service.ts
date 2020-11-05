import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/user/user.graphql';
import { Invitation, UpdateInvitation, InvitationCreateInput, InvitationUpdateInput, InvitationWhereUniqueInput } from './invitation.graphql';

@Injectable()
export class InvitationService {
  constructor(
    private prisma: PrismaService
  ) { }
  
  async findOne(where: InvitationWhereUniqueInput): Promise<Invitation> {
    try {
      return this.prisma.invitation.findOne({ where: { email_company_id: { email: where.email, company_id: where.company_id} } });
    } catch (error) {
      throw new Error(error);
    }
  }

  async findMany(where: InvitationWhereUniqueInput): Promise<Invitation[]> {
    try {
      return this.prisma.invitation.findMany({ where });
    } catch (error) {
      throw new Error(error);
    }
  }

  async create(invitationCreateData: InvitationCreateInput): Promise<Invitation> {
    try {
        const createdInvitation = await this.prisma.invitation.create({
          data: {
            email: invitationCreateData.email,
            status: 'SENT',
            Company: {
              connect: {
                id: invitationCreateData.company_id
              }
            }
          }
        });
        if (!createdInvitation) throw new Error('Failed to create invitation');
        return createdInvitation;
    } catch (error) {
      throw new Error(error);
    }
  }

  async accept(invitationUpdateData: InvitationUpdateInput, user: User): Promise<Invitation> {
    try {
      const invitation = await this.findOne({ email: invitationUpdateData.email, company_id: invitationUpdateData.company_id });
      if (!invitation) throw new Error('Invitation Not Found');
      if (invitation.email !== user.email) throw new Error('Unauthorizated');
      const result = await this.prisma.companyMember.create({
        data: {
          User: { connect: { id: user.id } },
          Company: { connect: { id: invitationUpdateData.company_id } }
        }
      });
      if (!result) throw new Error('Failed to accept invitation')
      const updatedInvitation = await this.prisma.invitation.delete({
        where: { email_company_id: { email: invitationUpdateData.email, company_id: invitationUpdateData.company_id } }
      });
      return { ...updatedInvitation, status: 'ACCEPTED' };
    } catch (error) {
      throw new Error(error);
    }
  }

  async reject(invitationUpdateData: InvitationUpdateInput, user: User): Promise<Invitation> {
    try {
        const invitation = await this.findOne({ email: invitationUpdateData.email, company_id: invitationUpdateData.company_id });
        if (!invitation) throw new Error('Invitation Not Found');
        if (invitation.email !== user.email) throw new Error('Unauthorizated');
        const rejectedInvitation = await this.prisma.invitation.update({
          where: { email_company_id: { email: invitationUpdateData.email, company_id: invitationUpdateData.company_id } },
          data: {
            status: 'REJECT',
            email: invitationUpdateData.email
          }
        })
        if (!rejectedInvitation) throw new Error('Failed to reject invitation');
        return rejectedInvitation;
    } catch (error) {
      throw new Error(error);
    }
  }

  async cancel(invitationUpdateData: InvitationUpdateInput, user: User): Promise<Invitation> {
    try {
        const canceledInvitations = await this.prisma.invitation.update({
          where: { email_company_id: { email: invitationUpdateData.email, company_id: invitationUpdateData.company_id } },
          data: {
            status: 'CANCELED',
            email: invitationUpdateData.email
          }
        })
        if (!canceledInvitations) throw new Error('Failed to reject invitation');
        return canceledInvitations;
    } catch (error) {
      throw new Error(error);
    }
  }
}
