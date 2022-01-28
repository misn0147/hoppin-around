import React, { useState, useEffect } from "react";
import Brewery from "./Brewery";

function Home() {
    const [breweries, setBreweries] = useState([]);
    const [selectedState, setSelectedState] = useState({});

    useEffect(() => {
        const where = selectedState.stateName;
        fetch(`https://api.openbrewerydb.org/breweries?by_state=${where}`)
            .then((response) => response.json())
            .then((data) => {
                setBreweries(data);
            })
            .catch((error) => {
                console.error(error.message);
                alert("There was an error fetching the data");
            });
    }, [selectedState]);

    const handleChange = (event) => {
        const newState = {};
        newState[event.target.name] = event.target.value;
        setSelectedState(newState);
    };

    const displayBreweries = () => {
        return breweries.map((brewery) => (
            <Brewery key={brewery.id} brewery={brewery} />
        ));
    };

    return (
        <>
    
            <form className="col-6 mx-auto mt-3">
                <select
                    className="form-select"
                    value={selectedState}
                    name="stateName"
                    onChange={handleChange}
                    multiple={false}
                >
                    <option value="defaultValue">Select a state</option>
                    <option value="alabama">Alabama</option>
                    <option value="alaska">Alaska</option>
                    <option value="arizona">Arizona</option>
                    <option value="arkansas">Arkansas</option>
                    <option value="california">California</option>
                    <option value="colorado">Colorado</option>
                    <option value="connecticut">Connecticut</option>
                    <option value="delaware">Delaware</option>
                    <option value="district_of_columbia">
                        District Of Columbia
                    </option>
                    <option value="florida">Florida</option>
                    <option value="georgia">Georgia</option>
                    <option value="hawaii">Hawaii</option>
                    <option value="idaho">Idaho</option>
                    <option value="illinois">Illinois</option>
                    <option value="indiana">Indiana</option>
                    <option value="iowa">Iowa</option>
                    <option value="kansas">Kansas</option>
                    <option value="kentucky">Kentucky</option>
                    <option value="louisiana">Louisiana</option>
                    <option value="maine">Maine</option>
                    <option value="maryland">Maryland</option>
                    <option value="massachusetts">Massachusetts</option>
                    <option value="michigan">Michigan</option>
                    <option value="minnesota">Minnesota</option>
                    <option value="mississippi">Mississippi</option>
                    <option value="missouri">Missouri</option>
                    <option value="montana">Montana</option>
                    <option value="nebraska">Nebraska</option>
                    <option value="nevada">Nevada</option>
                    <option value="new_hampshire">New Hampshire</option>
                    <option value="new_jersey">New Jersey</option>
                    <option value="new_mexico">New Mexico</option>
                    <option value="new_york">New York</option>
                    <option value="north_carolina">North Carolina</option>
                    <option value="north_dakota">North Dakota</option>
                    <option value="ohio">Ohio</option>
                    <option value="oklahoma">Oklahoma</option>
                    <option value="oregon">Oregon</option>
                    <option value="pennsylvania">Pennsylvania</option>
                    <option value="rhode_island">Rhode Island</option>
                    <option value="south_carolina">South Carolina</option>
                    <option value="south_dakota">South Dakota</option>
                    <option value="tennessee">Tennessee</option>
                    <option value="texas">Texas</option>
                    <option value="utah">Utah</option>
                    <option value="vermont">Vermont</option>
                    <option value="verginia">Virginia</option>
                    <option value="washington">Washington</option>
                    <option value="west_virginia">West Virginia</option>
                    <option value="wisconsin">Wisconsin</option>
                    <option value="wyoming">Wyoming</option>
                </select>
            </form>
            <div className="row ml-0 mr-0 mb-3">
                <div className="col-8 mx-auto">
                    <ul className="list-group ml-2">{displayBreweries()}</ul>
                </div>
            </div>
        </>
    );
}
export default Home;
