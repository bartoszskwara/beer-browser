import {BeerBasic} from "../../types";

const fetchBeers = async ({ pageParam = 1 }) => {
    const response = await fetch('https://api.punkapi.com/v2/beers?page=' + pageParam);
    return await response.json() as BeerBasic[];
}

export default fetchBeers;