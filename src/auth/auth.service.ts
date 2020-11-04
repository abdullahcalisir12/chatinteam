import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Token } from './auth.graphql';
import { hash, compare } from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { Users } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService
  ) { }

  findUserByEmail(email: string): Promise<Users> {
    return this.prismaService.users.findOne({
      where: { email },
    })
  }

  hashPassword(password: string): string {
    return hash(password, 10);
  }

  validatePassword(password: string, hashedPassword: string): Promise<boolean> {
    return compare(password, hashedPassword);
  }

  generateToken({ email, id }): Token {
    return {
      access_token: this.jwtService.sign({ email, id }),
    };
  }
}
