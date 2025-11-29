export type Brand = {
    name: string;
    id: number;
};

export type Model = {
    name: string;
    id: number;
    brandId: number;
};

export type BrandsResponse = {
    data: Brand[];
};

export type ModelsResponse = {
    data: Model[];
};

export type Selection = {
    brandId: number;
    modelId: number;
};

export type SelectionResponse = {
    brandId: number | null;
    modelId: number | null;
}

export type FetchingState = 'idle' | 'loading' | 'error' | 'success';