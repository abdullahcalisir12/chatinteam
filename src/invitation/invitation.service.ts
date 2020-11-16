import { Injectable } from '@nestjs/common';
import { InvitationWhereInput } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { SuccessResult } from 'src/shared/shared.graphql';
import { User } from 'src/user/user.graphql';
import { Invitation, InvitationCreateInput, InvitationUpdateInput, InvitationWhereUniqueInput } from './invitation.graphql';

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

  async findMany(where: InvitationWhereInput): Promise<Invitation[]> {
    try {
      return this.prisma.invitation.findMany({ where });
    } catch (error) {
      throw new Error(error);
    }
  }

  async waitingInvitations(user: User): Promise<Invitation[]> {
    try {
      return this.prisma.invitation.findMany({ where: { email: user.email, status: 'SENT' } });
    } catch (error) {
      throw new Error(error);
    }
  }

  async create(invitationCreateData: InvitationCreateInput): Promise<Invitation> {
    try {
      const invitation = await this.findOne({ email: invitationCreateData.email, company_id: invitationCreateData.company_id });
      if (invitation) throw new Error('There is already an invitation with this email');
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

  async accept(invitationUpdateData: InvitationUpdateInput, user: User): Promise<SuccessResult> {
    try {
      const invitation = await this.findOne({ email: user.email, company_id: invitationUpdateData.company_id });
      if (!invitation) throw new Error('Invitation Not Found');
      const result = await this.prisma.companyMember.create({
        data: {
          User: { connect: { id: user.id } },
          Company: { connect: { id: invitationUpdateData.company_id } }
        }
      });
      if (!result) throw new Error('Failed to accept invitation')
      const updatedInvitation = await this.delete({ email: user.email, company_id: invitationUpdateData.company_id });
      return {
        success: !!updatedInvitation
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async reject(invitationUpdateData: InvitationUpdateInput, user: User): Promise<SuccessResult> {
    try {
        const invitation = await this.findOne({ email: user.email, company_id: invitationUpdateData.company_id });
        if (!invitation) throw new Error('Invitation Not Found');

        const rejectedInvitation = await this.delete({ email: user.email, company_id: invitationUpdateData.company_id });
        if (!rejectedInvitation) throw new Error('Failed to reject invitation');
        return {
          success: !!rejectedInvitation
        };
    } catch (error) {
      throw new Error(error);
    }
  }

  async cancel(invitationUpdateData: InvitationUpdateInput): Promise<SuccessResult> {
    try {
      const invitation = await this.findOne({ email: invitationUpdateData.email, company_id: invitationUpdateData.company_id });
      if (!invitation) throw new Error('Invitation Not Found');

      const canceledInvitations = await this.delete({ email: invitationUpdateData.email, company_id: invitationUpdateData.company_id });
      if (!canceledInvitations) throw new Error('Failed to cancel invitation');
      return {
        success: !!canceledInvitations
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async delete({ email, company_id }) {
    const deletedInvitation = await this.prisma.invitation.delete({
      where: { email_company_id: { email, company_id } }
    });
    if (!deletedInvitation) throw new Error('Failed to delete invitation');
    return deletedInvitation;
  }
}
