import BeerDetails from "../components/BeerDetails/BeerDetails";
import {NextPage} from "next";
import { BeerDetails as BeerDetailsType } from '../types';

const Random: NextPage<BeerDetailsType> = (props) => (
    <BeerDetails {...props} />
);

export const getServerSideProps = async () => {
    const response = await fetch('https://api.punkapi.com/v2/beers/random');
    const beer = await response.json();
    return {
        props: {
            ...beer[0]
        }
    }
}

export default Random;