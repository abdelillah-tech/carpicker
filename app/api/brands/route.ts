import brandRepo from '@/src/db/repo';

export async function GET(request: Request) {
    try {
        const brands = await brandRepo.findAllBrands()
        return Response.json({
            data: brands,
        });
    } catch (error) {
        console.error("Error fetching brands:", error);
        return Response.json({ error: 'Failed to fetch brands' }, { status: 500 });
    }
}