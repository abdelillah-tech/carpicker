import { NextRequest } from "next/server"
import repo from '@/src/db/repo';

export async function GET(_req: NextRequest, ctx: RouteContext<'/api/brands/[id]/models'>) {
    const { id } = await ctx.params

    try {
        const models = await repo.findModelsByBrandId(Number(id))
        if (!models) {
            return Response.json({ error: 'Brand not found' }, { status: 404 })
        }
        return Response.json({
            "data": models
        })

    } catch (error) {
        console.error("Error fetching models for brand:", error);
        return Response.json({ error: 'Failed to fetch models for brand' }, { status: 500 });
    }
}
