import { eq } from 'drizzle-orm';
import { brands, InsertSelection, models, selections } from './schema';
import db from '.';
import { Brand, Model, Selection } from '../types';

const findAllBrands = async (): Promise<Brand[]> => await db.select().from(brands)
const findBrandById = async (id: number): Promise<Brand> =>
    db.select().from(brands).where(eq(brands.id, id)).limit(1).then(res => res[0]);

const findModelById = async (id: number): Promise<Model> => await db.select().from(models).where(eq(models.id, id)).limit(1).then(res => res[0]);
const findModelsByBrandId = async (id: number): Promise<Model[]> => await db.select().from(models).where(eq(models.brandId, id));

const saveSelection = async (selection: InsertSelection) => await db.insert(selections).values(selection).returning();
const findAllSelections = async (): Promise<Selection[]> => await db.select().from(selections)

export default {
    findAllBrands,
    findBrandById,
    findModelsByBrandId,
    findModelById,
    saveSelection,
    findAllSelections
};