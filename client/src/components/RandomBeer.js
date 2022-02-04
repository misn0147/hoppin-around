import React, { useState } from "react";
import Beer from "./Beer";

function RandomBeer() {
    const [beer, setBeer] = useState({});


    const handleSubmit = (event) => {
        event.preventDefault();
        fetch("https://api.punkapi.com/v2/beers/random")
            .then((response) => response.json())
            .then((data) => {
                setBeer(data[0]);
            })
            .catch(console.error);
    };

    return (
        <>
            <button onClick={handleSubmit} className="btn btn-info m-2">Discover a new beer</button>
            <Beer beer={beer}/>
        </>
    );
}
export default RandomBeer;
