import Image from 'next/image';
import styles from './BeerDetails.module.scss';
import { BeerDetails as BeerDetailsType } from '../../types';

const BeerDetails = ({ name, tagline, description, image_url, brewers_tips }: BeerDetailsType) => (
    <div className={styles.container}>
        <div className={styles.card}>
            <h1>{name}</h1>
            <h3>{tagline}</h3>
            {image_url && (
                <div className={styles.image}>
                    <Image
                        src={image_url}
                        alt={`Beer: ${name}`}
                        layout="fill"
                        objectFit="contain"
                    />
                </div>
            )}
            <p>{description}</p>
            <p style={{ fontStyle: 'italic' }}>{brewers_tips}</p>
        </div>
    </div>
)

export default BeerDetails;