import { BeerBasic } from '../../types';
import Layout from "../../components/Layout/Layout";
import BeerDetails from "../../components/BeerDetails/BeerDetails";
import {NextPage} from "next";
import { BeerDetails as BeerDetailsType } from '../../types';

interface Params {
    params: {
        beerId: number;
    }
}

const Beer: NextPage<BeerDetailsType> = (props) => <BeerDetails {...props} />;

export const getStaticPaths = async () => {
    const delay = (ms = 1100) => new Promise(resolve => setTimeout(resolve, ms));
    let result: BeerBasic[] = [];
    let beers;
    let page = 1;
    do {
        const response = await fetch(`https://api.punkapi.com/v2/beers?page=${page}`);
        beers = await response.json() as BeerBasic[];
        result = [...result, ...beers];
        page++;
        await delay();
    } while(beers.length);
    const paths = result.map(i => ({ params: { beerId: `${i.id}` }}));
    return {
        paths,
        fallback: false,
    }
}

export const getStaticProps = async ({ params: { beerId } }: Params) => {
    const response = await fetch(`https://api.punkapi.com/v2/beers/${beerId}`);
    const beer = await response.json();
    return {
        props: {
            ...beer[0]
        }
    }
}

export default Beer;