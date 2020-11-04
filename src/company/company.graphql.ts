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

  @Field(type => Int)
  creatorId: number;

  @Field(type => [User], { nullable: true})
  CompanyUsers?: User[];

  @Field(type => [Invitation], { nullable: true })
  Invitations?: Invitation[];

  @Field(type => [Team], { nullable: true })
  Teams?: Team[];
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
