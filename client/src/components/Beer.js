import React from "react";
import beerImg from "../images/generic_beer.png";
function Beer({ beer }) {
    return (
        <>
            {beer.name ? (
                <>
                    <h1 className="beer-font text-center pl-2 mt-2">
                        {beer.name}
                    </h1>
                    <h3 className="beer-font text-center pl-2 mt-2">
                        {beer.tagline}
                    </h3>
                    <div className="container">
                        <div className="row">
                            <div className="col-6">
                                {beer.image_url ? (
                                    <img src={beer.image_url} alt={beer.name} />
                                ) : (
                                    <img src={beerImg} alt={beer.name} />
                                )}
                            </div>
                            <div className="col-6">
                                <h5 className="my-3">
                                    Description: {beer.description}
                                </h5>
                                <h5 className="my-3">
                                    Brewer's Tips: {beer.brewers_tips}
                                </h5>
                                <h5 className="my-3">Food Pairings:</h5>
                                {beer.food_pairing &&
                                    beer.food_pairing.length > 0 && (
                                        <ul>
                                            {beer.food_pairing.map((food) => (
                                                <li key={food}>{food}</li>
                                            ))}
                                        </ul>
                                    )}
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div></div>
            )}
        </>
    );
}
export default Beer;
