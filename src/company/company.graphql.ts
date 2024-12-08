import { Field, Int, ObjectType, InputType } from "@nestjs/graphql";
import { Invitation } from "src/invitation/invitation.graphql";
import { Team } from "src/team/team.graphql";
import { User } from "src/user/user.graphql";

@ObjectType()
export class Company {
  @Field(type => Int)
  id: number;

  @Field()
  name: string;

  @Field(type => User, { nullable: true})
  owner?: User;

  @Field(type => [User], { nullable: true })
  members?: User[];

  @Field(type => [Invitation], { nullable: true })
  invitations?: Invitation[];

  @Field(type => [Team], { nullable: true })
  teams?: Team[];
  owner_id: number;
}

@InputType()
export class CompanyWhereUniqueInput {
  @Field(type => Int, { nullable: true })
  id: number;
}

@InputType()
export class CompanyCreateInput {
  @Field()
  name: string;
}
