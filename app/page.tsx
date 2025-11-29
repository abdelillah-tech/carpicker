import { fetchBrands } from "./api.client";
import Playground from "./component/Playground";

export default async function Home() {
    const brands = await fetchBrands().catch((error) => {
        console.error("Error fetching brands in Home page:", error);
    });

    if (!brands) {
        return (
            <h1 className="text-center text-red-500">Failed to load brands.</h1>
        );
    }

    if (brands.data.length === 0) {
        return (
            <h1 className="text-center text-gray-500">No brands available.</h1>
        );
    }

    return (
        <Playground brands={brands.data} />
    );
}
