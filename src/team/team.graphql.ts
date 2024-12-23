import { Field, Int, ObjectType, InputType } from "@nestjs/graphql";
import { Company } from "src/company/company.graphql";
import { User } from "src/user/user.graphql";

@ObjectType()
export class Team {
  @Field(type => Int)
  id: number;

  @Field()
  name: string;

  @Field(type => Company)
  company?: Company;

  @Field(type => [User], { nullable: true })
  members?: User[];
}

@InputType()
export class TeamWhereUniqueInput {
  @Field(type => Int)
  id: number;
}

@InputType()
export class TeamCreateInput {
  @Field()
  name: string;

  @Field(type => Int)
  company_id: number;
}
