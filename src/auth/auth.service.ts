import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Token } from './auth.graphql';
import { hash, compare } from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService
  ) { }

  // timeout error check
  findUserByEmail(email: string): Promise<User> {
    return this.prismaService.user.findOne({
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
      user: {
        email,
        id
      },
      access_token: this.jwtService.sign({ email, id }),
    };
  }
}
