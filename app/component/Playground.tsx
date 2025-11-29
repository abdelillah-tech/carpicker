'use client'
import { BrandProps } from "./BrandItem";
import { useSelector } from "../hooks";
import ModelItem from "./ModelItem";
import { Model } from "@/src/types";
import { ReactNode } from "react";
import BrandItem from "./BrandItem";

interface ListProps {
    brands: Array<BrandProps>;
}

function getModelsComponent(value: string, models: Model[], setModel: (model: Model) => void): ReactNode {
    switch (value) {
        case 'idle':
            return <p>Please select a brand.</p>;
        case 'loading':
            return <p>Loading models...</p>;
        case 'error':
            return <p className="text-red-500">Error loading models. Please try again.</p>;
        case 'success':
            return <ul>
                {models.map((item) => (
                    <li key={item.id}>
                        <button onClick={() => setModel(item)}>
                            <ModelItem {...item} />
                        </button>
                    </li>
                ))}
            </ul>
    }
}

export default function Playground(props: ListProps) {
    if (props.brands.length === 0) {
        return <p>No items found.</p>;
    }

    const { reset, changeBrand, setModel, brand, model, models, fetchingState } = useSelector();

    return (
        <div className="gap-4 flex flex-col">
            <div className="flex gap-4">
                <button className="border" onClick={reset}>reset</button>
                <h1>{`brand: ${brand ? brand.name : "no selection"}`}</h1>
                <h1>{`brand: ${model ? model.name : "no selection"}`}</h1>
            </div>
            <div className="flex gap-4 justify-between">
                <div>
                    <h1 className="text-green-600">Brands:</h1>
                    <ul>
                        {props.brands.map((item) => (
                            <li key={item.id}>
                                <button onClick={() => changeBrand(item)}>
                                    <BrandItem {...item} />
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h1 className="text-green-600">Models:</h1>
                    {getModelsComponent(fetchingState, models, setModel)}
                </div>
            </div>
        </div>
    )
}