import {BeerBasic} from "../../types";
import styles from './BeersList.module.scss';
import Link from "next/link";
import {useInfiniteQuery} from "@tanstack/react-query";
import fetchBeers from "./fetchBeers";
import BeerItem from "./BeerItem";

interface Props {
    beers: BeerBasic[];
}

const BeersList = ({ beers }: Props) => {

    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery<BeerBasic[]>(['beers'], fetchBeers, {
        getNextPageParam: (lastPage, allPages) => !lastPage || !lastPage.length ? undefined : allPages.length + 1,
        initialData: {
            pages: [beers],
            pageParams: [1]
        }
    })

    return (
        <div className={styles.container}>
            <>
                {error && <p>Error when fetching beers.</p>}
                {data && (
                    <div className={styles.listContainer}>
                        {data.pages.flatMap(page => page).flatMap(b => (
                            <Link key={b.id} href={`/beers/${b.id}`}>
                                <a>
                                    <BeerItem
                                        name={b.name}
                                        tagline={b.tagline}
                                        imageUrl={b.image_url}
                                    />
                                </a>
                            </Link>
                        ))}
                    </div>
                )}
                {hasNextPage && (
                    <div
                        className={styles.showMore} onClick={!hasNextPage || isFetchingNextPage ? undefined : () => fetchNextPage()}
                    >
                        {isFetchingNextPage ? 'Loading...' : 'Show more'}
                    </div>
                )}
            </>
        </div>
    )
}

export default BeersList;