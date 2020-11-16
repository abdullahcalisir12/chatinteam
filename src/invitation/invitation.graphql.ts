import { Field, Int, ObjectType, InputType } from "@nestjs/graphql";
import { Company } from "src/company/company.graphql";

@ObjectType()
export class Invitation {
  @Field()
  status: string;

  @Field()
  email: string;

  @Field(type => Int)
  company_id?: number;

  @Field(type => Company)
  company?: Company;
}

@ObjectType()
export class UpdateInvitation {
  @Field()
  email: string;

  @Field()
  status: string;
}

@InputType()
export class InvitationWhereUniqueInput {
  @Field({ nullable: true })
  email?: string;

  @Field(type => Int, { nullable: true })
  company_id?: number;
}

@InputType()
export class InvitationCreateInput {
  @Field()
  email: string;

  @Field(type => Int)
  company_id: number;
}

@InputType()
export class InvitationUpdateInput {
  @Field({ nullable: true })
  email?: string;

  @Field(type => Int, { nullable: true })
  company_id?: number;
}
