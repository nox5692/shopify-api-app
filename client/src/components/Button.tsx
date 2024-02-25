import styles from './components.module.css';

// Interface for typing props
interface ButtonProps {
    size: 'small' | 'medium' | 'large';
    url?: string;
    children?: React.ReactNode;
}

export default function Button({ size, url, children }: ButtonProps) : React.JSX.Element {
    var padding = '8px';
    if (size === 'medium') {
        padding = '12px';
      } else if (size === 'large') {
        padding = '16px';
      }
    return (
        <button
            style={{padding: padding}} 
            className={styles.button}
        >
            {
                url ? (
                    <a href={url}>{children}</a>
                ) : (
                    <>{children}</>
                )
            }
        </button>
    )
}
