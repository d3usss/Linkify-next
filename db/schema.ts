import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const usersTable = sqliteTable('users', {
  id: integer('id').primaryKey(),
  password: text('password').notNull(),
  email: text('email').unique().notNull(),
  createdAt: integer('created_at')
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
});

export const urlsTable = sqliteTable('urls', {
  id: integer('id').primaryKey(),
  orginalUrl: text('url').notNull(),
  shortUrl: text('short_url').notNull(),
  createdAt: integer('created_at')
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
  updateAt: integer('updated_at')
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
});

export type InsertedUser = typeof usersTable.$inferInsert;
export type InsertedUrl = typeof urlsTable.$inferInsert;

export type User = typeof usersTable.$inferSelect;
export type Url = typeof urlsTable.$inferSelect;
