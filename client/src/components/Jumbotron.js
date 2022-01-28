import React from "react";

function Jumbotron() {
    return (
        <>
            <div>
                <div className="jumbotron py-5">
                    <div className="row">
                        <div className="col-8 px-5">
                            <h1 className="display-4">
                                <strong>Hoppin' Around</strong>
                            </h1>
                            <p className="lead">
                                <strong>
                                    What's hoppin? Select a state to discover
                                    some cool local breweries!
                                </strong>
                            </p>
                        </div>
                        <div className="col-4"></div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Jumbotron;
