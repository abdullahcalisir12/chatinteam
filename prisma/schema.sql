-- Drop ALL TABLE 

-- DROP TABLE IF EXISTS "Invitation", "Team", "Company", "User";
DROP TABLE IF EXISTS "TeamMember", "CompanyMember", "Invitation", "Team", "Company", "User" RESTRICT;

-- User --

CREATE TABLE IF NOT EXISTS "User" (
  id SERIAL PRIMARY KEY NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL
);

-- Company --

CREATE TABLE IF NOT EXISTS "Company" (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  owner_id INT NOT NULL references "User" (id)
);

-- Team --

CREATE TABLE IF NOT EXISTS "Team" (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  company_id INT NOT NULL references "Company" (id)
);

-- Invitation --

CREATE TABLE IF NOT EXISTS "Invitation" (
  status VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  company_id INT NOT NULL references "Company" (id),
  CONSTRAINT invitation_id PRIMARY KEY (email, company_id)
);

-- Company Members - User can be a member of many companies and company can have multiple members

CREATE TABLE IF NOT EXISTS "CompanyMember" (
  id SERIAL NOT NULL UNIQUE,
  user_id INT NOT NULL references "User" (id),
  company_id INT NOT NULL references "Company" (id),
  CONSTRAINT company_member_id PRIMARY KEY (id, user_id, company_id)
);

-- Team Members - User can be a member of many team and team can have multiple members

CREATE TABLE IF NOT EXISTS "TeamMember" (
  team_id INT NOT NULL references "Team" (id),
  company_member_id INT NOT NULL references "CompanyMember" (id),
  CONSTRAINT team_member_id PRIMARY KEY (company_member_id, team_id)
);
