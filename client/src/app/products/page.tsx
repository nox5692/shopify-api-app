"use client"
import { Product, ProductVariant } from '../utils/types/interfaces';
import { useState, useEffect } from 'react';
import { API_PRODUCTS_ENDPOINT } from '../utils/config/vars';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import styles from './page.module.css';
import 'swiper/css';
import 'swiper/css/pagination';
import Image from 'next/image';
import { isInstrumentationHookFile } from 'next/dist/build/utils';

export default function ProductPage({ searchParams }: any): React.JSX.Element {
  // Extracted ID from search parameters, used for fetching product data from selected api endpoint
  const productId = searchParams.id;
  // Global product variable, all static info extracted from here
  const [productData, setProductData] = useState<Product | null>(null);
  // Current selected variant to be displayed (price, title, options)
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);

  // Async fetch of product data
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const res = await fetch(`${API_PRODUCTS_ENDPOINT}/${productId}`);
        if (!res.ok) {
          throw new Error('Failed to fetch product');
        }
        const data = await res.json();
        setProductData(data);
        // Set the first variant as the initially selected one
        if (data.variants.edges.length > 0) {
          setSelectedVariant(data.variants.edges[0].node);
        }
      } catch (e) {
        console.error('Error fetching product:', e);
      }
    };
    fetchProductData();
  }, [productId]);

  console.log(productData);

  // Updates dynamic fields according to what variant is selected by the dropdown menu
  const handleVariantChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const variantId = event.target.value;
    const variant = productData?.variants.edges.find(({ node }) => node.id === variantId)?.node;
    if (variant) {
      setSelectedVariant(variant);
    }
  };

  // Image url of the first image of the images array
  // Used to check if any image exists
  const imageUrl = productData?.images.edges[0]?.node.originalSrc;

  return (
    <div className={styles.product_page_container}>
      <div className={styles.product_media_container}>
        {imageUrl ? (
          <Swiper
            className={styles.product_image_slide_container}
            spaceBetween={0}
            slidesPerView={1}
            pagination={true}
            modules={[Pagination]}
          >
            {productData?.images.edges.map(({ node: image }) => (
              <SwiperSlide className={styles.product_image_slide_container} key={image.id}>
                <Image
                  objectFit={'contain'}
                  fill={true}
                  src={image.originalSrc}
                  alt={image.altText}
                  placeholder='blur'
                  blurDataURL={'/no-media.png'}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <Image
            objectFit={'contain'}
            fill={true}
            src={'/no-media.png'}
            alt={'No product image available.'}
          />
        )}
      </div>
      <div className={styles.product_info_container}>
        <h5 className={styles.product_info_vendor}>{productData?.vendor}</h5>
        <h1 className={styles.product_info_title}>{productData?.title} {(productData?.variants.edges.length && productData.variants.edges.length > 1) ?(<> - {selectedVariant?.title}</>):(<></>)}</h1>
        {selectedVariant?.availableForSale ? (<h3 style={{ color: "#2b9b11" }}>Skladem</h3>) : (<h3 style={{ color: "red" }}>Není skladem</h3>)}
        {/* If product has multiple variants (more than one), generate an option select field */}
        {(productData?.variants.edges.length && productData.variants.edges.length > 1) ? (
          <>
            <select onChange={handleVariantChange}>
              {productData?.variants.edges.map(({ node: variant }) => (
                <option key={variant.id} value={variant.id}>{variant.selectedOptions[0].name}: {variant.title}</option>
              ))}
            </select>
            { selectedVariant?.compareAtPriceV2 ? (
              <>
                <p className={styles.product_info_compare_price}>{selectedVariant?.compareAtPriceV2.amount}</p>
                <h2 className={styles.product_info_price_discount}>{selectedVariant?.priceV2.amount} {selectedVariant?.priceV2.currencyCode}</h2>
              </>
            ) : (
              <>
                <h2 className={styles.product_info_price}>{selectedVariant?.priceV2.amount} {selectedVariant?.priceV2.currencyCode}</h2>
              </>
            )}
          </>
        ) : (
          <>
            { selectedVariant?.compareAtPriceV2 ? (
              <>
                <p className={styles.product_info_compare_price}>{selectedVariant?.compareAtPriceV2.amount}</p>
                <h2 className={styles.product_info_price_discount}>{selectedVariant?.priceV2.amount} {selectedVariant?.priceV2.currencyCode}</h2>
              </>
            ) : (
              <>
                <h2 className={styles.product_info_price}>{selectedVariant?.priceV2.amount} {selectedVariant?.priceV2.currencyCode}</h2>
              </>
            )}
          </>
        )}
        <p className={styles.product_info_description}>
          {productData?.description}
        </p>
      </div>
    </div>
  );
}
