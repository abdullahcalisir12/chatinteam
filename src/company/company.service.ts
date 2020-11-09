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
  async findOne(where: CompanyWhereUniqueInput): Promise<Company> {
    try {
      const company = await this.prisma.company.findOne({ where });

      if (!company) throw new Error('Company Not found');
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
            owner_id: user.id
          },
          {
            User: {
              id: user.id
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
      const company = await this.findOne(where);
      console.log(company);
      if (company && company.owner_id === user.id) {
        const deletedCompany = await this.prisma.company.delete({ where });
        if (!deletedCompany) throw new Error('Failed to delete company');
        return { id: where.id };
      } else {
        throw new Error('Unauthorizated');
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}
