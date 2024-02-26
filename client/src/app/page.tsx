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
    const fetchCollections = async () => {
      try {
        const res = await fetch(API_COLLECTIONS_ENDPOINT);
        if (!res.ok) {
          throw new Error('Failed to fetch collections');
        }
        const data = await res.json();
        // Map array nodes to an array of raw collections
        const collections_array: Collection[] = data.map((c: { node: Collection }) => c.node);
        setCollections(collections_array);
      } catch (e) {
        console.error('Error fetching collections:', e);
      }
    };
    fetchCollections();
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <h1 className={styles.main_title}>Browse collections</h1>
      <ul className={styles.collection_list_container}>
        {collections.map((collection: Collection) => (
          <li className={styles.collection_list_item} key={collection.id}>
            <Link href={
              {
                pathname: `/collections`,
                query: { id: `${collection.id}` }
              }
            }>
              <CollectionTile title={collection.title} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}