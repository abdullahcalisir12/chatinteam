import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class DeleteResult {
  @Field(type => Int)
  id: number;
}

@ObjectType()
export class SuccessResult {
  @Field(type => Int)
  success: boolean;
}