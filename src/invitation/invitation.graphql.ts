import { Field, Int, ObjectType, InputType } from "@nestjs/graphql";
import { Invitations, Teams } from "@prisma/client";
import { User } from "src/user/user.graphql";

@ObjectType()
export class Invitation {
  @Field()
  status: string;

  @Field()
  email: string;

  @Field()
  companyId: number;
}
