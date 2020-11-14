-- Drop ALL TABLE 

-- DROP TABLE IF EXISTS "Invitation", "Team", "Company", "User";
DROP TABLE IF EXISTS "public"."TeamMember", "public"."CompanyMember", "public"."Invitation", "public"."Team", "public"."Company", "public"."User" RESTRICT;

-- User --

CREATE TABLE IF NOT EXISTS "public"."User" (
  id SERIAL PRIMARY KEY NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL
);

-- Company --

CREATE TABLE IF NOT EXISTS "public"."Company" (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  owner_id INT NOT NULL references "public"."User" (id)
);

-- Team --

CREATE TABLE IF NOT EXISTS "public"."Team" (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  "company_id" INT NOT NULL,
  CONSTRAINT "company" FOREIGN KEY ("company_id") REFERENCES "public"."Company" (id) ON DELETE CASCADE
);

-- Invitation --

CREATE TABLE IF NOT EXISTS "public"."Invitation" (
  status VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  "company_id" INT NOT NULL,
  CONSTRAINT "company" FOREIGN KEY ("company_id") REFERENCES "public"."Company" (id) ON DELETE CASCADE,
  CONSTRAINT invitation_id PRIMARY KEY (email, company_id)
);

-- Company Members - User can be a member of many companies and company can have multiple members

CREATE TABLE IF NOT EXISTS "public"."CompanyMember" (
  "user_id" INT NOT NULL,
  "company_id" INT NOT NULL,
  CONSTRAINT "user" FOREIGN KEY ("user_id") REFERENCES "public"."User" (id) ON DELETE CASCADE,
  CONSTRAINT "company" FOREIGN KEY ("company_id") REFERENCES "public"."Company" (id) ON DELETE CASCADE,
  CONSTRAINT company_member_id PRIMARY KEY (user_id, company_id)
);

-- Team Members - User can be a member of many team and team can have multiple members

CREATE TABLE IF NOT EXISTS "public"."TeamMember" (
  "user_id" INT NOT NULL,
  "team_id" INT NOT NULL,
  CONSTRAINT "user" FOREIGN KEY ("user_id") REFERENCES "public"."User" (id) ON DELETE CASCADE,
  CONSTRAINT "team" FOREIGN KEY ("team_id") REFERENCES "public"."Team" (id) ON DELETE CASCADE,
  CONSTRAINT team_member_id PRIMARY KEY (user_id, team_id)
);
