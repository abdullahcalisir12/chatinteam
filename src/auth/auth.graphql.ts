import { Field, ObjectType, InputType } from "@nestjs/graphql";
import { User } from "src/user/user.graphql";

@ObjectType()
export class Token {
  @Field()
  access_token?: string;

  @Field(type => User)
  user: User;
}

@InputType()
export class LoginInput {
  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType()
export class RegisterInput extends LoginInput { }


