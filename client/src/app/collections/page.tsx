"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Collection, Product } from '../utils/types/interfaces';
import { API_COLLECTIONS_ENDPOINT } from '../utils/config/vars';
import ProductTile from '../../components/ProductTile';
import styles from './page.module.css';


export default function CollectionPage({ searchParams }: any): React.JSX.Element {
  const collectionId = searchParams.id;
  const [collectionData, setCollectionData] = useState<Collection | null>(null);

  useEffect(() => {
    const fetchCollectionData = async () => {
      try {
        const res = await fetch(`${API_COLLECTIONS_ENDPOINT}/${collectionId}`);
        if (!res.ok) {
          throw new Error('Failed to fetch collection');
        }
        const data = await res.json();
        setCollectionData(data);
      } catch (e) {
        console.error('Error fetching collection:', e);
      }
    };

    fetchCollectionData();
  }, [collectionId])

  var title: string | null = null;
  var imgUrl: string | null = null;
  var products: { node: Product }[] = [];

  if (collectionData) {
    title = collectionData.title;
    products = collectionData.products.edges;
  }

  return (
    <div className='page-width'>
      {title ? (
        <h1 className={styles.collection_title}>{title}</h1>
      ) : (
        <h1>Collection not found</h1>
      )}
      <ul className={styles.product_list_container}>
        {products.map((p: { node: Product }) => (
          <li key={p.node.id} className={styles.product_tile_container}>
            <Link href={
              {
                pathname: `/products`,
                query: { id: `${p.node.id}` }
              }
            }>
              <ProductTile product={p.node} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};