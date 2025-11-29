import { NextRequest } from "next/server";
import repo from "@/src/db/repo";
import * as z from "zod"

const Selection = z.object({
    brandId: z.number(),
    modelId: z.number()
})

export async function GET(req: NextRequest) {
    try {
        const selections = await repo.findAllSelections();
        return Response.json({
            data: selections,
        });
    } catch (error) {
        return Response.json({ error: 'Failed to find selections' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const payload = await req.json();

        const validationResult = await validate(payload);

        if (validationResult) {
            return Response.json(validationResult.details, { status: validationResult.status })
        }

        await repo.saveSelection(payload);

        return Response.json({ message: 'Selection saved successfully' }, { status: 201 });
    } catch (error) {
        return Response.json({ error: 'Failed to save selection' }, { status: 500 });
    }
}


type Error = {
    error: string,
}

type ValidationResult = {
    details: Error,
    status: number
}

async function validate(payload: unknown): Promise<ValidationResult | undefined> {
    let selection
    try {
        selection = Selection.parse(payload)
    } catch(error) {
        if (error instanceof z.ZodError) {
            return { details : { error: error.issues.toString() }, status: 400}
        }
        return { details : { error: 'Failed to save selection' }, status: 500}
    } 

    const [brand, model] = await Promise.all([
        repo.findBrandById(selection.brandId),
        repo.findModelById(selection.modelId)
    ])

    if (!brand) {
        return { details : { error: 'Brand deosn\'t exist' }, status: 400}
    }
    if (!model) {
        return { details : { error: 'Model deosn\'t exist' }, status: 400}
    }
    if (model.brandId !== selection.brandId) {
        return { details : { error: 'Wrong model for the brand' }, status: 409}
    }

    return
}