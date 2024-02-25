import { createStorefrontApiClient } from '@shopify/storefront-api-client';
import express from 'express';
import cors from 'cors';

// =============================================================================
const SHOPIFY_STORE_URL = 'https://magexo-interview.myshopify.com/api';
const SHOPIFY_API_TOKEN = '4a7580803918255b7e93ee661ff2cead';


// Initialize a new express server app on port 3000
const app = express();
const PORT = 3000;
app.use(cors());

// Init a new Shopify API client
const client = createStorefrontApiClient({
    storeDomain: SHOPIFY_STORE_URL,
    apiVersion: '2024-01',
    publicAccessToken: SHOPIFY_API_TOKEN,
});

// Query for all collections and their products with their info
// This is a general query for majority of product information that can be used as whole or split into sets
const productQuery = `
query getProducts($first: Int){
    collections(first: $first) {
        edges {
            node {
                title
                id
                products(first: 100) {
                    edges {
                        node {
                            id
                            title
                            description
                            handle
                            availableForSale
                            productType
                            vendor
                            tags
                            createdAt
                            updatedAt
                            options {
                                id
                                name
                                values
                            }
                            variants(first: 100) {
                                edges {
                                    node {
                                        id
                                        title
                                        sku
                                        availableForSale
                                        priceV2 {
                                            amount
                                            currencyCode
                                        }
                                        compareAtPriceV2 {
                                            amount
                                            currencyCode
                                        }
                                        selectedOptions {
                                            name
                                            value
                                        }
                                    }
                                }
                            }
                            images(first: 10) {
                                edges {
                                    node {
                                        id
                                        originalSrc
                                        altText
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
`;

// Request shopify api with the graphql query mask
// Data -> all the collections with products
const { data } = await client.request(productQuery, {
    variables: {
        first: 100
    }
});

// Retrieve all collections and their respective products from the graph
const collections = data.collections.edges;

// Create an API endpoint for all collections and their products
app.get('/collections', async (req, res) => {
    try {
        res.json(collections)
    } catch (e) {
        console.log(e);
        res.status(500);
    }
});

// Create an API endpoint for each respective collection in dataset
collections.forEach(c => {
    const collection = c.node;
    app.get(`/collections/${collection.id}`, async (req, res) => {
        try {
            res.json(collection);
        } catch (e) {
            console.log(e);
            res.status(500);
        }

    })
    const products = collection.products.edges;
    // Create endpoints for each product in collection
    products.forEach(p => {
        const product = p.node;
        app.get(`/products/${product.id}`, async (req, res) => {
            try {
                res.json(product);
            } catch (e) {
                console.log(e);
                res.status(500);
            }
        })
    })
});

// Run backend on port
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
