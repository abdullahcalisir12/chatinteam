import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class DeleteResult {
  @Field()
  id: number;
}