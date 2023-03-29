import { selector, atom } from 'recoil';

export type Result = {
    name?: string;
    title?: string;
};

export const menus = [
    {
        name: "People",
        url: "https://swapi.dev/api/people/"
    },
    {
        name: "Planets",
        url: "https://swapi.dev/api/planets/"
    },
    {
        name: "Films",
        url: "https://swapi.dev/api/films/"
    },
    {
        name: "Species",
        url: "https://swapi.dev/api/species/"
    },
    {
        name: "Vehicles",
        url: "https://swapi.dev/api/vehicles/"
    },
    {
        name: "Starships",
        url: "https://swapi.dev/api/starships/"
    }
];

export const currentMenuIndexState = atom({
    key: 'Current Menu Index',
    default: 0
});

export const resultsSelector = selector({
    key: 'Current Results',
    get: async ({get}) => {
        const response = await fetch(menus[get(currentMenuIndexState)].url);
        const body = await response.json();
        return body.results;
    },    
});
