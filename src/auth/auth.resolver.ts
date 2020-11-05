import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { Token } from './auth.graphql';
import { UserService } from '../user/user.service';
import { LoginInput, RegisterInput } from './auth.graphql';
import { AuthService } from './auth.service';
import { BadRequestException, ConflictException, UseGuards } from '@nestjs/common';
import { User } from 'src/user/user.graphql';
import { CurrentUser } from './currentUser.decorator';
import { JwtAuthGuard } from './jwt-auth.guard';

@Resolver('Auth')
export class AuthResolver {
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) { }
  
  @Query(returns => User)
  @UseGuards(JwtAuthGuard)
  async me(@CurrentUser() user): Promise<User> {
    return this.userService.findOne({ id: user.id });
  }

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
    const hashedPassword = await this.authService.hashPassword(password);
    const registeredUser = await this.userService.create({ email, password: hashedPassword });
    return this.authService.generateToken(registeredUser);
  }
}
