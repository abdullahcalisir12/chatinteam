import { Field, Int, ObjectType, InputType } from "@nestjs/graphql";
import { Company } from "src/company/company.graphql";
import { Invitation } from "src/invitation/invitation.graphql";

@ObjectType()
export class User {
  @Field(type => Int)
  id: number;

  @Field()
  email: string;
}

@InputType()
export class UserWhereUniqueInput {
  @Field(type => Int, { nullable: true })
  id?: number;

  @Field({ nullable: true })
  email?: string;
}

@InputType()
export class UserCreateInput {
  @Field()
  email: string;

  @Field()
  password: string;
}
