import { PrismaClient } from "../../generated/client/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import mariadb from "mariadb";

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  const pool = mariadb.createPool({
    host: process.env.MYSQL_HOST || "localhost",
    port: parseInt(process.env.MYSQL_PORT || "3306"),
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "",
    database: process.env.MYSQL_DATABASE || "pesantren_db",
    connectionLimit: 10,
  });
  const adapter = new PrismaMariaDb(pool);
  prisma = new PrismaClient({ adapter });
} else {
  // Prevent multiple instances of Prisma Client in development
  if (!(global as any).globalPrisma) {
    const pool = mariadb.createPool({
      host: process.env.MYSQL_HOST || "localhost",
      port: parseInt(process.env.MYSQL_PORT || "3306"),
      user: process.env.MYSQL_USER || "root",
      password: process.env.MYSQL_PASSWORD || "",
      database: process.env.MYSQL_DATABASE || "pesantren_db",
      connectionLimit: 5,
    });
    const adapter = new PrismaMariaDb(pool);
    (global as any).globalPrisma = new PrismaClient({ adapter });
  }
  prisma = (global as any).globalPrisma;
}

export { prisma };
