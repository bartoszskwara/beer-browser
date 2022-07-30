import type { NextPage } from 'next'
import { BeerBasic } from '../types';
import BeersList from "../components/BeersList/BeersList";

interface Props {
    beers: BeerBasic[];
}

const Home: NextPage<Props> = ({ beers }) => (
    <BeersList beers={beers} />
);

export const getStaticProps = async () => {
    const response = await fetch('https://api.punkapi.com/v2/beers');
    const data: BeerBasic[] = await response.json();
    const beers = (data || []).map(i => ({ id: i.id, name: i.name, image_url: i.image_url, tagline: i.tagline }));
    return {
        props: {
            beers
        }
    }
}

export default Home;
