import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DeleteResult } from 'src/shared/shared.graphql';
import { User } from 'src/user/user.graphql';
import { Company, CompanyWhereUniqueInput, CompanyCreateInput } from './company.graphql';

@Injectable()
export class CompanyService {
  constructor(
    private prisma: PrismaService
  ) {}
  async findOne(where: CompanyWhereUniqueInput, user: User): Promise<Company> {
    try {
      const company = await this.prisma.company.findOne({ where });

      if (!company) throw new Error('Company Not found');
      if (company && company.owner_id !== user.id) throw new Error('Validation Error');
      return company;
    } catch (error) {
       throw new Error(error)
    }
  }

  async findMany(user: User): Promise<Company[]> {
    try {
      const companies = await this.prisma.company.findMany({ where: {
        OR: [
          {
            owner_id: user.id,
          },
          {
            CompanyMember: {
              some: {
                user_id: user.id
              }
            }
          }
        ]
      }});
      if (!companies) throw new Error('Company Not found');
      return companies;
    } catch (error) {
       throw new Error(error)
    }
  }

  async create(companyCreateData: CompanyCreateInput, user: User): Promise<Company> {
    try {
      const company = await this.prisma.company.create({
        data: {
          ...companyCreateData,
          User: {
            connect: {
              id: user.id
            }
          },
          CompanyMember: {
            create: {
              User: {
                connect: {
                  id: user.id
                }
              }
            }
          }
        }
      });
      if (!company) throw new Error('Failed to create company');
      return company;
    } catch (error) {
      throw new Error(error);
    }
  }

  async delete(where: CompanyWhereUniqueInput, user: User): Promise<DeleteResult> {
    try {
      const company = await this.findOne(where, user);
      if (company && company.owner_id === user.id) {
        await this.prisma.companyMember.deleteMany({ where: { company_id: company.id }});
        const deletedCompany = await this.prisma.company.delete({ where });
        if (!deletedCompany) throw new Error('Failed to delete company');
        return { id: where.id };
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}
