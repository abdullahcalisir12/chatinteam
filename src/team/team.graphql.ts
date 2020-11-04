import { Field, Int, ObjectType, InputType } from "@nestjs/graphql";
import { Invitations, Teams } from "@prisma/client";
import { User } from "src/user/user.graphql";

@ObjectType()
export class Team {
  @Field(type => Int)
  id: number;

  @Field()
  name: string;

  @Field(type => Int)
  companyId: number;
}
