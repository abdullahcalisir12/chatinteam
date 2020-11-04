import { Field, Int, ObjectType, InputType, registerEnumType } from "@nestjs/graphql";
import { InvitationTypes } from "./invitation.enum";

registerEnumType(InvitationTypes, {
  name: 'InvitationTypes',
});

@ObjectType()
export class Invitation {
  @Field(type => InvitationTypes)
  status: InvitationTypes;

  @Field()
  email: string;

  @Field(type => Int)
  companyId: number;
}


@InputType()
export class InvitationWhereUniqueInput {
  @Field({ nullable: true })
  email?: string;

  @Field(type => Int, { nullable: true })
  companyId?: number;
}

@InputType()
export class InvitationCreateInput {
  @Field()
  email: string;

  @Field(type => Int)
  companyId: number;
}

@InputType()
export class InvitationUpdateInput extends InvitationCreateInput {
  @Field(type => InvitationTypes)
  status: InvitationTypes;
}
