import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User, UserWhereUniqueInput, UserCreateInput } from './user.graphql';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/currentUser.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
@Resolver(of => User)
export class UserResolver {
  constructor(
    private userService: UserService,
  ) { }
  
  @Query(returns => User)
  @UseGuards(JwtAuthGuard)
  async user(
    @CurrentUser() currentUser,
    @Args('userWhereUniqueInput', { type: () => UserWhereUniqueInput }) userWhereUniqueInput
  ): Promise<User> {
    return this.userService.findOne(userWhereUniqueInput);
  }

  @Mutation(returns => User)
  async createUser(@Args('userCreateInput', { type: () => UserCreateInput }) userCreateInput): Promise<User> {
    return this.userService.create(userCreateInput);
  }

  @Mutation(returns => User)
  async deleteUser(@Args('userWhereUniqueInput', { type: () => UserWhereUniqueInput }) userWhereUniqueInput): Promise<User> {
    return this.userService.delete(userWhereUniqueInput);
  }
}
