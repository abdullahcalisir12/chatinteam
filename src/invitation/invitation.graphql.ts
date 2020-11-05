import { Field, Int, ObjectType, InputType, registerEnumType } from "@nestjs/graphql";
import { Company } from "src/company/company.graphql";

@ObjectType()
export class Invitation {
  @Field()
  status: string;

  @Field()
  email: string;

  @Field(type => Company)
  company?: Company;
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
  @Field()
  status: string;
}
