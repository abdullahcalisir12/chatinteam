import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class DeleteResult {
  @Field(type => Int)
  id: number;
}