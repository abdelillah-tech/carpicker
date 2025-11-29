export interface BrandProps {
    "name": string;
    "id": number;
}

export default function BrandItem(props: BrandProps) {
    return <div>{props.name}</div>;
}