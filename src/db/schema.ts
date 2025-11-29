import { pgTable, integer, varchar } from "drizzle-orm/pg-core"
import { InferInsertModel } from 'drizzle-orm';

export const brands = pgTable('brands', {
  id: integer().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
});

export const models = pgTable('models', {
  id: integer().primaryKey(),  
  name: varchar({ length: 255 }).notNull(),
  brandId: integer("brand_id").references(() => brands.id).notNull(),
});

export const selections = pgTable('selections', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  brandId: integer("brand_id").references(() => brands.id).notNull(),
  modelId: integer("model_id").references(() => models.id).notNull(),
});

export type InsertSelection = InferInsertModel<typeof selections>;