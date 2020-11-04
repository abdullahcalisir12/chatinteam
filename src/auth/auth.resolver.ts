import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Token } from './auth.graphql';
import { UserService } from '../user/user.service';
import { LoginInput, RegisterInput } from './auth.graphql';
import { AuthService } from './auth.service';
import { BadRequestException, ConflictException } from '@nestjs/common';

@Resolver('Auth')
export class AuthResolver {
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  @Mutation(returns => Token)
  async login(@Args('loginInput', { type: () => LoginInput }) loginInput: LoginInput): Promise<Token> {
    const { email, password } = loginInput;
    const user = await this.authService.findUserByEmail(email);
    if (!user || !this.authService.validatePassword(password, user.password)) throw new BadRequestException('Invalid Credentials');
    return this.authService.generateToken(user);
  }

  @Mutation(returns => Token)
  async register(@Args('registerInput', { type: () => RegisterInput }) registerInput: RegisterInput): Promise<Token> {
    const { email, password } = registerInput;
    const user = await this.authService.findUserByEmail(email);
    if (user) throw new ConflictException(`Email is already used.`);
    const registeredUser = await this.userService.create({ email, password: this.authService.hashPassword(password) });
    return this.authService.generateToken(registeredUser);
  }
}