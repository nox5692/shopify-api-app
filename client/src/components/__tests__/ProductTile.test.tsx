import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ProductTile from '../ProductTile';
import { Product } from '@/app/utils/types/interfaces';

// Testing the ProductTile component

const EXAMPLE_PRODUCT: Product = {
    "id": "gid://shopify/Product/8879208956226",
    "title": "The Collection Snowboard: Liquid",
    "description": "",
    "handle": "the-collection-snowboard-liquid",
    "availableForSale": true,
    "productType": "",
    "vendor": "Hydrogen Vendor",
    "tags": [
        "Accessory",
        "Sport",
        "Winter"
    ],
    "createdAt": "2023-10-19T09:34:15Z",
    "updatedAt": "2023-10-19T09:47:49Z",
    "options": [
        {
            "id": "gid://shopify/ProductOption/11163053293890",
            "name": "Title",
            "values": [
                "Default Title"
            ]
        }
    ],
    "variants": {
        "edges": [
            {
                "node": {
                    "id": "gid://shopify/ProductVariant/47179638669634",
                    "title": "Default Title",
                    "sku": "",
                    "availableForSale": true,
                    "priceV2": {
                        "amount": "749.95",
                        "currencyCode": "CZK"
                    },
                    "compareAtPriceV2": null,
                    "selectedOptions": [
                        {
                            "name": "Title",
                            "value": "Default Title"
                        }
                    ]
                }
            }
        ]
    },
    "images": {
        "edges": [
            {
                "node": {
                    "id": "gid://shopify/ProductImage/43098877591874",
                    "originalSrc": "https://cdn.shopify.com/s/files/1/0842/1936/3650/products/Main_b13ad453-477c-4ed1-9b43-81f3345adfd6.jpg?v=1697708055",
                    "altText": "Top and bottom view of a snowboard. The top view shows a stylized scene of water, trees, mountains,\n        sky and a moon in blue colours. The bottom view has a blue liquid, drippy background with the text “liquid” in\n        a stylized script typeface."
                }
            }
        ]
    }
}

const EXAMPLE_PRODUCT_NO_IMAGE: Product = {
    "id": "gid://shopify/Product/8879208956226",
    "title": "The Collection Snowboard: Liquid",
    "description": "",
    "handle": "the-collection-snowboard-liquid",
    "availableForSale": true,
    "productType": "",
    "vendor": "Hydrogen Vendor",
    "tags": [
        "Accessory",
        "Sport",
        "Winter"
    ],
    "createdAt": "2023-10-19T09:34:15Z",
    "updatedAt": "2023-10-19T09:47:49Z",
    "options": [
        {
            "id": "gid://shopify/ProductOption/11163053293890",
            "name": "Title",
            "values": [
                "Default Title"
            ]
        }
    ],
    "variants": {
        "edges": [
            {
                "node": {
                    "id": "gid://shopify/ProductVariant/47179638669634",
                    "title": "Default Title",
                    "sku": "",
                    "availableForSale": true,
                    "priceV2": {
                        "amount": "749.95",
                        "currencyCode": "CZK"
                    },
                    "compareAtPriceV2": null,
                    "selectedOptions": [
                        {
                            "name": "Title",
                            "value": "Default Title"
                        }
                    ]
                }
            }
        ]
    },
    "images": {
        "edges": []
    }
}

describe('ProductTile', () => {
    // Checks if the image data has succesfully transfered
    it('renders the product image with the correct alt text', () => {
        render(<ProductTile product={EXAMPLE_PRODUCT}/>)
        const img = screen.queryByRole('img');
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute('alt', EXAMPLE_PRODUCT.images.edges[0].node.altText);
    })

    // Checks if the tile correctly handles no image available
    it('renders the product image with the correct alt text', () => {
        render(<ProductTile product={EXAMPLE_PRODUCT_NO_IMAGE}/>)
        const img = screen.queryByRole('img');
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute('alt', 'No product image available.');
    })
})

