import { Product } from '../app/utils/types/interfaces';
import styles from './components.module.css';
import Image from 'next/image';
import Button from './Button';

// Interface for typing props
interface ProductProps {
    product: Product;
}

// A product tile being generated in a collection preview for each respective product in that collection
export default function productTile(props: ProductProps): React.JSX.Element {
    const product = props.product;
    const imageUrl = product.images.edges[0]?.node.originalSrc;
    return (
        <div className={styles.product_tile}>
            <div className={styles.product_tile_image_container}>
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={product.images.edges[0].node.altText}
                        fill={true}
                        objectFit="contain"
                        placeholder='blur'
                        blurDataURL={'/no-media.png'}
                    ></Image>
                ) : (
                    <Image
                        src={'/no-media.png'}
                        alt={'No product image available.'}
                        fill={true}
                        objectFit="contain"
                    ></Image>
                )}
            </div>
            <h3 className={styles.product_tile_title}>{product.title}</h3>
            {
                product.variants.edges[0].node.compareAtPriceV2?.amount ?
                    (
                        <>
                            <h4 className={styles.product_compare_price_discount}>{product.variants.edges[0].node.priceV2.amount} {product.variants.edges[0].node.priceV2.currencyCode}</h4>
                            <h5 className={styles.product_compare_price}>{product.variants.edges[0].node.compareAtPriceV2?.amount}</h5>
                        </>

                    ) : (
                        <>
                            <h4 className={styles.product_tile_price}>{product.variants.edges[0].node.priceV2.amount} {product.variants.edges[0].node.priceV2.currencyCode}</h4>
                            <h5 className={styles.product_compare_price}></h5>
                        </>
                    )
            }
            <Button size={'medium'}>More info</Button>
        </div>
    )
}