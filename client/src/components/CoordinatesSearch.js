import { useEffect, useState } from "react";
import Brewery from "./Brewery";

const DEFAULT_SEARCH = {search: "Austin, TX"};

export default function CoordinateSearch() {
    const [locationSearch, setLocationSearch] = useState(DEFAULT_SEARCH);
    const [breweries, setBreweries] = useState([]);

    useEffect(() => {
        const where = locationSearch.search;
        fetch(`
        https://api.mapbox.com/geocoding/v5/mapbox.places/${where}.json?access_token=pk.eyJ1IjoibWlzbjAxNDciLCJhIjoiY2t5enh1dGk2MG41bzJ2cm0xYzB2eWkwZSJ9.bMvmj6HGEH_6Bo0yf0BJ3Q`)
            .then((response) => response.json())
            .then((data) => {
                const coords = [];
                coords[0] = data.features[0].geometry.coordinates[1];
                coords[1] = data.features[0].geometry.coordinates[0];
                const stringCoords = coords.toString();
                stringCoords.replace("[", "");
                stringCoords.replace("]", "");
                return fetch(
                    `https://api.openbrewerydb.org/breweries?by_dist=${stringCoords}`
                )
                    .then((response) => response.json())
                    .then((data) => {
                        setBreweries(data);
                    })
                    .catch((error) => {
                        console.error(error.message);
                        alert("There was an error fetching the data");
                    });
            })
            .catch((error) => {
                console.error(error.message);
                alert("There was an error fetching the data");
            });
    }, [locationSearch]);

    const handleChange = (event) => {
        const newSearch = {};
        newSearch[event.target.name] = event.target.value;
        setLocationSearch(newSearch);
    };

    const displayBreweries = () => {
        return breweries.map((brewery) => (
            <Brewery key={brewery.id} brewery={brewery} />
        ));
    };

    return (
        <>
            <form className="col-6 mx-auto mt-3">
                <div className="mb-3">
                    <label htmlFor="search" className="form-label">
                        Search for a city or zip code: 
                    </label>
                    <input
                        value={locationSearch.search}
                        name="search"
                        onChange={handleChange}
                        type="search"
                        className="form-control"
                        id="search"
                        aria-describedby="search"
                    />
                </div>
            </form>
            <div className="row ml-0 mr-0 mb-3">
                <div className="col-8 mx-auto">
                    <ul className="list-group ml-2">{displayBreweries()}</ul>
                </div>
            </div>
        </>
    );
}
