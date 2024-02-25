"use client"
import { useEffect, useState } from 'react';
import { API_COLLECTIONS_ENDPOINT } from '@/app/utils/config/vars';
import { Collection } from '@/app/utils/types/interfaces';
import styles from './components.module.css'
import Link from 'next/link';

interface HeaderProps {
    title: string;
}

export default function Header(props: HeaderProps): React.JSX.Element {
    // Set collections to an empty array, will be filled with collections objects after api fetch
    const [collections, setCollections] = useState<Collection[]>([]);

    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    useEffect(() => {
        fetch(API_COLLECTIONS_ENDPOINT)
            .then(response => response.json())
            .then(data => {
                const collections: any = data.map((c: any) => c.node);
                setCollections(collections);
            })
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };


    return (
        <header className={styles.header}>
            <div className={`${styles.header_container} container`}>
                <Link href={'/'}>
                    <h1 className={styles.header_title}>{props.title}</h1>
                </Link>
                <nav className={styles.header_nav}>
                {collections.length > 0 && (
                        <>
                            <div className={styles.menu_icon} onClick={toggleMenu}>
                                Menu
                            </div>
                            <div className={`${styles.menu_items} ${isMenuOpen ? styles.open : ''}`}>
                                {collections.map(c =>
                                    <Link key={c.id} href={{
                                        pathname: `/collections`,
                                        query: { id: `${c.id}` }
                                    }}
                                    onClick={toggleMenu}
                                    className={styles.menu_item}
                                    >
                                        {c.title}
                                    </Link>
                                )}
                            </div>
                        </>
                    )}
                </nav>
            </div>
        </header>
    )
}