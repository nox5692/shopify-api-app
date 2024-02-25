import styles from './components.module.css';
import Button from './Button';

// Interface to type props
interface CollectionTileProps {
    title: string
};

export default function CollectionTile(props: CollectionTileProps): React.JSX.Element {
    return (
        <div className={styles.collection_tile}>
            <h3>{props.title}</h3>
            <Button size={'medium'}>See products</Button>
        </div>
    )
}