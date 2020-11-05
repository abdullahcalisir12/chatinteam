import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User, UserWhereUniqueInput } from './user.graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { DeleteResult } from 'src/shared/shared.graphql';

@Resolver(of => User)  
@UseGuards(JwtAuthGuard)
export class UserResolver {

  constructor(private userService: UserService) { }

  @Query(returns => User)
  async user(@Args('userWhereUniqueInput', { type: () => UserWhereUniqueInput }) userWhereUniqueInput): Promise<User> {
    return this.userService.findOne(userWhereUniqueInput);
  }

  @Mutation(returns => User)
  async deleteUser(@Args('userWhereUniqueInput', { type: () => UserWhereUniqueInput }) userWhereUniqueInput): Promise<DeleteResult> {
    return this.userService.delete(userWhereUniqueInput);
  }
};