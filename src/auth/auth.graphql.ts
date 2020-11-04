import { Field, ObjectType, InputType } from "@nestjs/graphql";

@ObjectType()
export class Token {
  @Field()
  access_token?: string;
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


