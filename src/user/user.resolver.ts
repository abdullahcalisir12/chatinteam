import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User, UserWhereUniqueInput } from './user.graphql';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/currentUser.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
@Resolver(of => User)  
@UseGuards(JwtAuthGuard)
export class UserResolver {
  constructor(
    private userService: UserService,
  ) { }
  
  @Query(returns => User)
  async user(
    @CurrentUser() currentUser,
    @Args('userWhereUniqueInput', { type: () => UserWhereUniqueInput }) userWhereUniqueInput
  ): Promise<User> {
    return this.userService.findOne(userWhereUniqueInput);
  }

  @Mutation(returns => User)
  async deleteUser(@Args('userWhereUniqueInput', { type: () => UserWhereUniqueInput }) userWhereUniqueInput): Promise<User> {
    return this.userService.delete(userWhereUniqueInput);
  }
}
