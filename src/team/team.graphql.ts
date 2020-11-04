import { Field, Int, ObjectType, InputType } from "@nestjs/graphql";
import { Company } from "src/company/company.graphql";

@ObjectType()
export class Team {
  @Field(type => Int)
  id: number;

  @Field()
  name: string;

  @Field(type => Int)
  companyId: number;
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
  companyId: number;
}
