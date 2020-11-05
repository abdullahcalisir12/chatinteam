import { Field, Int, ObjectType, InputType } from "@nestjs/graphql";
import { Company } from "src/company/company.graphql";

@ObjectType()
export class User {
  @Field(type => Int)
  id: number;

  @Field()
  email: string;

  @Field(type => [Company], { nullable: true })
  ownedCompanies?: Company[]

  @Field(type => [Company], { nullable: true })
  joinedCompanies?: Company[]
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
