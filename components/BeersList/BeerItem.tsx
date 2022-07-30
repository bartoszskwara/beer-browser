import {forwardRef} from "react";
import styles from './BeerItem.module.scss';
import Image from "next/image";

interface Props {
    name: string;
    tagline: string;
    imageUrl: string;
}

const BeerItem = forwardRef<HTMLDivElement, Props>(({ name, tagline, imageUrl }, ref) => (
    <div ref={ref} className={styles.container}>
        {imageUrl && (
            <div className={styles.image}>
                <Image
                    src={imageUrl}
                    alt={`Beer: ${name}`}
                    layout="fill"
                    objectFit="cover"
                />
            </div>
        )}
        <div className={styles.content}>
            <h3>{name}</h3>
            <h6>{tagline}</h6>
        </div>
    </div>
));
BeerItem.displayName = 'BeerItem';

export default BeerItem;