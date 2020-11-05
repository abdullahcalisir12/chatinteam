import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DeleteResult } from 'src/shared/shared.graphql';
import { User } from 'src/user/user.graphql';
import { Company, CompanyWhereUniqueInput, CompanyWhereInput, CompanyCreateInput } from './company.graphql';

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

  async findMany(where: CompanyWhereInput): Promise<Company[]> {
    try {
      return this.prisma.company.findMany({ where });
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
      if (!company) throw new Error('Error');
      return company;
    } catch (error) {
      throw new Error(error);
    }
  }

  async delete(where: CompanyWhereUniqueInput, user: User): Promise<DeleteResult> {
    try {
      const company = await this.findOne(where);
      if (company.owner.id === user.id) {
        const deletedCompany = await this.prisma.company.delete({ where });
        if (!company) throw new Error('Error');
        return { id: where.id };
      } else {
        throw new Error('Unauthorizated');
      }
    } catch (error) {
      throw new Error(error)
    }
  }
}
