export interface ModelCardProps {
    "name": string;
    "id": number;
}

export default function ModelCardItem(props: ModelCardProps) {
    return <div>{props.name}</div>;
}