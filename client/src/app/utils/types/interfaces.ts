export interface ProductVariant {
    id: string;
    title: string;
    sku: string;
    availableForSale: boolean;
    priceV2: {
        amount: string;
        currencyCode: string;
    };
    compareAtPriceV2: null | {
        amount: string;
        currencyCode: string;
    };
    selectedOptions: {
        name: string;
        value: string;
    }[];
}

export interface ProductOption {
    id: string;
    name: string;
    values: string[];
}

export interface Product {
    id: string;
    title: string;
    description: string;
    handle: string;
    availableForSale: boolean;
    productType: string;
    vendor: string;
    tags: string[];
    createdAt: string;
    updatedAt: string;
    options: ProductOption[];
    variants: {
        edges: {
            node: ProductVariant;
        }[];
    };
    images: {
        edges: any[];
    };
}

export interface Collection {
    title: string;
    id: string;
    products: {
        edges: {
            node: Product;
        }[];
    };
}
