import { useEffect, useState } from "react";
import { fetchModels, saveSelection } from "../api.client";
import { Brand, Model, FetchingState } from "@/src/types";

export const useSelector = () => {
    const [brand, setBrand] = useState<Brand | null>(null);
    const [model, setModel] = useState<Model | null>(null);
    const [models, setModels] = useState<Model[]>([]);
    const [fetchingState, setFetchingState] = useState<FetchingState>('idle');

    const reset = () => {
        setBrand(null);
        setModel(null);
    }

    const changeBrand = (b: Brand) => {
        setBrand(b);
        setModel(null);
    }

    useEffect(() => {
        if (brand) {
            setFetchingState('loading');
            fetchModels(brand.id).then((data) => {
                setModels(data.data);
                setFetchingState('success');
            }).catch((error) => {
                console.error("Error fetching models:", error);
                setFetchingState('error');
            });
        }

        return () => {
            setModels([])
            setFetchingState('idle')
        };
    }, [brand]);

    useEffect(() => {
        if (model) {
            saveSelection({
                brandId: model.brandId,
                modelId: model.id
            }).catch((error) => {
                console.error("Error fetching models:", error);
            })
        }

        return () => { };
    }, [model])

    return {
        reset,
        changeBrand,
        setModel,
        fetchingState,
        brand,
        model,
        models
    }
}