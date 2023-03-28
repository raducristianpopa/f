import { InferModel } from "drizzle-orm";
import type { Kyselify } from "drizzle-orm/kysely";
import {
  char,
  index,
  int,
  mysqlEnum,
  mysqlTable,
  real,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable(
  "users",
  {
    id: char("id", { length: 16 }).primaryKey(),
    clerk_id: varchar("clerk_id", { length: 64 }).notNull(),
    username: varchar("username", { length: 60 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    created_at: timestamp("created_at").defaultNow().notNull(),
    updated_at: timestamp("updated_at").defaultNow().notNull().onUpdateNow(),
  },
  (table) => ({
    usernameIndex: index("users__username__index").on(table.username),
    usernameUniqueIndex: uniqueIndex("users__username__unique_index").on(
      table.username,
    ),
    email_index: uniqueIndex("users__email__index").on(table.email),
    created_at_index: index("users__created_at__index").on(table.created_at),
  }),
);

export const recipes = mysqlTable(
  "recipes",
  {
    id: char("id", { length: 16 }).primaryKey(),
    slug: varchar("slug", { length: 255 }).notNull(),
    user_id: char("user_id", { length: 16 }).notNull(),
    title: varchar("title", { length: 255 }).notNull(),
    description: text("description").notNull(),
    preparation_time: int("preparation_time").notNull(),
    cooking_time: int("cooking_time").notNull(),
    servings: int("servings").notNull(),
    difficulty: mysqlEnum("difficulty", ["EASY", "MEDIUM", "HARD"]).notNull(),
    created_at: timestamp("created_at").defaultNow().notNull(),
    updated_at: timestamp("updated_at").defaultNow().notNull().onUpdateNow(),
  },
  (table) => ({
    slug_index: index("recipes__slug__index").on(table.slug),
    slug_unique_index: uniqueIndex("recipes__slug__unique_index").on(
      table.slug,
    ),
    created_at_index: index("created_at__index").on(table.created_at),
  }),
);

export const allergens = mysqlTable("allergens", {
  id: char("id", { length: 16 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull().onUpdateNow(),
});

export const recipe_allergens = mysqlTable("recipe_allergens", {
  recipe_id: char("recipe_id", { length: 16 }).notNull(),
  allergen_id: char("allergen_id", { length: 16 }).notNull(),
});

export const ingredients = mysqlTable("ingredients", {
  id: char("id", { length: 16 }).primaryKey(),
  recipe_id: char("recipe_id", { length: 16 }).notNull(),
  unit_id: char("unit_id", { length: 16 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  quantity: real("quantity").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull().onUpdateNow(),
});

export const instructions = mysqlTable("instructions", {
  id: char("id", { length: 16 }).primaryKey(),
  recipe_id: char("recipe_id", { length: 16 }).notNull(),
  step: int("step").notNull(),
  description: text("description").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull().onUpdateNow(),
});

export const recipe_nutrition = mysqlTable("recipe_nutrition", {
  id: char("id", { length: 16 }).primaryKey(),
  recipe_id: char("recipe_id", { length: 16 }).notNull(),
  calories: real("calories").notNull(),
  protein: real("protein").notNull(),
  fat: real("fat").notNull(),
  carbohydrates: real("carbohydrates").notNull(),
  fiber: real("fiber").notNull(),
  sugar: real("sugar").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull().onUpdateNow(),
});

export const units = mysqlTable("units", {
  id: char("id", { length: 16 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  abbreviation: varchar("abbreviation", { length: 10 }).notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull().onUpdateNow(),
});

export type UserModel = typeof users;
export type UserSelect = InferModel<UserModel, "select">;
export type UserInsert = InferModel<UserModel, "insert">;

export type RecipeModel = typeof recipes;
export type RecipeSelect = InferModel<RecipeModel, "select">;
export type RecipeInsert = InferModel<RecipeModel, "insert">;

export type AllergenModel = typeof allergens;
export type AllergenSelect = InferModel<AllergenModel, "select">;
export type AllergenInsert = InferModel<AllergenModel, "insert">;

export type RecipeAllergenModel = typeof recipe_allergens;
export type RecipeAllergenSelect = InferModel<RecipeAllergenModel, "select">;
export type RecipeAllergenInsert = InferModel<RecipeAllergenModel, "insert">;

export type IngredientModel = typeof ingredients;
export type IngredientSelect = InferModel<IngredientModel, "select">;
export type IngredientInsert = InferModel<IngredientModel, "insert">;

export type InstructionModel = typeof instructions;
export type InstructionSelect = InferModel<InstructionModel, "select">;
export type InstructionInsert = InferModel<InstructionModel, "insert">;

export type RecipeNutritionModel = typeof recipe_nutrition;
export type RecipeNutritionSelect = InferModel<RecipeNutritionModel, "select">;
export type RecipeNutritionInsert = InferModel<RecipeNutritionModel, "insert">;

export type UnitModel = typeof units;
export type UnitSelect = InferModel<UnitModel, "select">;
export type UnitInsert = InferModel<UnitModel, "insert">;

export interface Database {
  users: Kyselify<UserModel>;
  recipes: Kyselify<RecipeModel>;
  allergens: Kyselify<AllergenModel>;
  recipe_allergens: Kyselify<RecipeAllergenModel>;
  ingredients: Kyselify<IngredientModel>;
  instructions: Kyselify<InstructionModel>;
  recipe_nutrition: Kyselify<RecipeNutritionModel>;
  units: Kyselify<UnitModel>;
}
