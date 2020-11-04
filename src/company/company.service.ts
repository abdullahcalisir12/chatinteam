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
    return this.prisma.companies.findOne({ where });
  }

  async create(companyCreateData: CompanyCreateInput, user: User): Promise<Company> {
    return this.prisma.companies.create({
      data: {
        ...companyCreateData,
        Users: {
          connect: {
           id: user.id
          }
        }
      }
    });
  }

  async delete(where: CompanyWhereUniqueInput): Promise<DeleteResult> {
    const company = await this.prisma.companies.delete({ where });
    if (!company) throw new Error('Error');
    return { id: where.id };
  }
}
