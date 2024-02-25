"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link'
import { Collection } from './utils/types/interfaces'
import { API_COLLECTIONS_ENDPOINT } from './utils/config/vars';
import styles from './page.module.css'
import CollectionTile from '@/components/CollectionTile';

export default function Home(): React.JSX.Element {
  // Set collections to an empty array, will be filled with collections objects after api fetch
  const [collections, setCollections] = useState<Collection[]>([]);
  useEffect(() => {
    fetch(API_COLLECTIONS_ENDPOINT)
      .then(response => response.json())
      .then(data => {
        const collections: any = data.map((c: any) => c.node);
        setCollections(collections);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <div style={{width: "100%"}}>
      <h1 className={styles.main_title}>Browse collections</h1>
      <ul className={styles.collection_list_container}>
        {collections.map((collection: Collection) => (
          <li className={styles.collection_list_item} key={collection.id}>
            <Link href={
              {
                pathname: `/collections`,
                query: { id: `${collection.id}`}
              }
            }>
              <CollectionTile title={collection.title}/>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}