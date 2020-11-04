-- User --
DROP TABLE IF EXISTS "Users";
CREATE TABLE IF NOT EXISTS "Users" (
  id SERIAL PRIMARY KEY NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL
);

-- Companies --

DROP TABLE IF EXISTS "Companies";
CREATE TABLE IF NOT EXISTS "Companies" (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  "creatorId" INTEGER NOT NULL,
  FOREIGN KEY ("creatorId") REFERENCES "Users" ("id")
);


-- Teams --

DROP TABLE IF EXISTS "Teams";
CREATE TABLE IF NOT EXISTS "Teams" (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  "companyId" INTEGER NOT NULL,
  CONSTRAINT company FOREIGN KEY ("companyId") REFERENCES "Companies" ("id")
);

-- CompanyUsers --

DROP TABLE IF EXISTS "CompanyUsers";
CREATE TABLE IF NOT EXISTS "CompanyUsers" (
  "userId" INTEGER NOT NULL,
  "companyId" INTEGER NOT NULL,
  FOREIGN KEY ("userId")  REFERENCES "Users"("id"),
  FOREIGN KEY ("companyId") REFERENCES "Companies"("id"),
  UNIQUE("userId", "companyId")
);

-- TeamUsers --

DROP TABLE IF EXISTS "TeamUsers";
CREATE TABLE IF NOT EXISTS "TeamUsers" (
  "userId" INTEGER NOT NULL,
  "teamId" INTEGER NOT NULL,
  FOREIGN KEY ("userId")  REFERENCES "Users"("id"),
  FOREIGN KEY ("teamId") REFERENCES "Teams"("id"),
  UNIQUE("userId", "teamId")
);

-- Invitations --

DROP TABLE IF EXISTS "Invitations";
CREATE TABLE IF NOT EXISTS "Invitations" (
  status VARCHAR(255) NOT NULL,
  "email" VARCHAR(255) NOT NULL,
  "companyId" INTEGER NOT NULL,
  FOREIGN KEY ("companyId") REFERENCES "Companies"("id"),
  UNIQUE("email", "companyId")
);
