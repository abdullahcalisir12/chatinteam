import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { CompanyModule } from './company/company.module';
import { UserModule } from './user/user.module';
import { InvitationModule } from './invitation/invitation.module';
import { TeamModule } from './team/team.module';
import { CompanyMembersModule } from './company-members/company-members.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      context: ({ req }) => ({ req }),
    }),
    CompanyModule,
    UserModule,
    AuthModule,
    InvitationModule,
    TeamModule,
    CompanyMembersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
