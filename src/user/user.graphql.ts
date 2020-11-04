import { Field, Int, ObjectType, InputType } from "@nestjs/graphql";

@ObjectType()
export class User {
  @Field(type => Int)
  id: number;

  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType()
export class UserWhereUniqueInput {
  @Field(type => Int, { nullable: true })
  id: number;

  @Field({ nullable: true })
  email: string;
}

@InputType()
export class UserCreateInput {
  @Field()
  email: string;

  @Field()
  password: string;
}
