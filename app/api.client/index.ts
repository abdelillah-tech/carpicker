import { BrandsResponse, ModelsResponse, Selection } from "@/src/types";

const baseUrl = 'http://localhost:3000';

const getErrorMessage = async (res: Response): Promise<string> => {
    try {
        const errorBody = await res.json();
        return errorBody.error || 'An unknown error occurred';
    } catch(error: any) {
        console.error("Error parsing error response:", error);
        return 'An unknown error occurred';
    }
}

async function fetchBrands(): Promise<BrandsResponse> {
    const res = await fetch(`${baseUrl}/api/brands`).catch((error) => {
        console.error("Network error fetching brands:", error);
        throw new Error('Network error occurred while fetching brands');
    });

    if (!res.ok) {
        const message = await getErrorMessage(res)
        throw new Error(message);
    }

    return await res.json();
}

async function fetchModels(brandId: number): Promise<ModelsResponse> {
    const res = await fetch(`${baseUrl}/api/brands/${brandId}/models`).catch((error) => {
        console.error("Network error fetching models:", error);
        throw new Error('Network error occurred while fetching models');
    });

    if (!res.ok) {
        const message = await getErrorMessage(res)
        throw new Error(message);
    }

    return await res.json();
}

async function saveSelection(selection: Selection): Promise<void> {
    const res = await fetch(`${baseUrl}/api/selections`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(selection),
    }).catch((error) => {
        console.error("Network error saving selection:", error);
        throw new Error('Network error occurred while saving selection');
    });

    if (!res.ok) {
        const message = await getErrorMessage(res)
        throw new Error(message);
    }
}

export {
    fetchBrands,
    fetchModels,
    saveSelection
}