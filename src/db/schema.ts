import {
  sqliteTable,
  text,
  integer,
  primaryKey,
} from "drizzle-orm/sqlite-core";
import { createId } from "@paralleldrive/cuid2";
import { AdapterAccountType } from "@auth/core/adapters";
import { InferSelectModel, relations } from "drizzle-orm";

export const users = sqliteTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: integer("emailVerified", { mode: "timestamp_ms" }),
  image: text("image"),
  role: text("role").default("USER"),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).$defaultFn(
    () => new Date()
  ),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" }).$defaultFn(
    () => new Date()
  ),
});

export const usersRelations = relations(users, ({ one }) => ({
  gameData: one(gameData, {
    fields: [users.id],
    references: [gameData.userId],
  }),
}));

export type DUser = InferSelectModel<typeof users>;

export const accounts = sqliteTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export type DAccount = InferSelectModel<typeof accounts>;

export const sessions = sqliteTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
});

export type DSession = InferSelectModel<typeof sessions>;

export const verificationTokens = sqliteTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
  },
  (verificationToken) => ({
    compositePk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  })
);

export type DVerificationToken = InferSelectModel<typeof verificationTokens>;

export const authenticators = sqliteTable(
  "authenticator",
  {
    credentialID: text("credentialID").notNull().unique(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: integer("credentialBackedUp", {
      mode: "boolean",
    }).notNull(),
    transports: text("transports"),
  },
  (authenticator) => ({
    compositePK: primaryKey({
      columns: [authenticator.userId, authenticator.credentialID],
    }),
  })
);

export type DAuthenticator = InferSelectModel<typeof authenticators>;

export const gameData = sqliteTable("game_data", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  userId: text("user_id")
    .notNull()
    .references(() => users.id)
    .unique(),
  totalCompleted: integer("total_completed").default(0),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).$defaultFn(
    () => new Date()
  ),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" }).$defaultFn(
    () => new Date()
  ),
});

export const gameDataRelations = relations(gameData, ({ one, many }) => ({
  user: one(users, {
    fields: [gameData.userId],
    references: [users.id],
  }),
  completedPuzzles: many(puzzlesCompleted),
}));

export type DGameData = InferSelectModel<typeof gameData>;

export const alphabets = sqliteTable("alphabets", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text("name").notNull().unique(),
  characters: text("characters").notNull(),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).$defaultFn(
    () => new Date()
  ),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" }).$defaultFn(
    () => new Date()
  ),
});

export const alphabetsRelations = relations(alphabets, ({ many }) => ({
  puzzles: many(puzzles),
}));

export type DAlphabet = InferSelectModel<typeof alphabets>;

export const puzzles = sqliteTable("puzzles", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  word: text("word").notNull(),
  tip: text("tip").notNull(),
  alphabetName: text("alphabet_name")
    .notNull()
    .references(() => alphabets.name),
  maxAttempts: integer("max_attempts").notNull().default(5),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).$defaultFn(
    () => new Date()
  ),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" }).$defaultFn(
    () => new Date()
  ),
});

export const puzzlesRelations = relations(puzzles, ({ one, many }) => ({
  alphabet: one(alphabets, {
    fields: [puzzles.alphabetName],
    references: [alphabets.name],
  }),
  completions: many(puzzlesCompleted),
}));

export type DPuzzle = InferSelectModel<typeof puzzles>;

export const puzzlesCompleted = sqliteTable("puzzles_completed", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  puzzleId: text("puzzle_id")
    .notNull()
    .references(() => puzzles.id),
  completedAt: integer("completed_at", { mode: "timestamp_ms" }).$defaultFn(
    () => new Date()
  ),
  gameDataId: text("game_data_id")
    .notNull()
    .references(() => gameData.id),
});

export const puzzlesCompletedRelations = relations(
  puzzlesCompleted,
  ({ one }) => ({
    gameData: one(gameData, {
      fields: [puzzlesCompleted.gameDataId],
      references: [gameData.id],
    }),
    puzzle: one(puzzles, {
      fields: [puzzlesCompleted.puzzleId],
      references: [puzzles.id],
    }),
  })
);

export type DPuzzlesCompleted = InferSelectModel<typeof puzzlesCompleted>;
