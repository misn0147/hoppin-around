import React from "react";

function Jumbotron() {
    return (
        <>
            <div>
                <div className="jumbotron py-5">
                    <div className="row no-gutters">
                        <div className="col-9 px-5">
                            <h1 className="display-4 title-font">
                                <strong>Hoppin' Around</strong>
                            </h1>
                            <h2 className="lead subtitle-font">
                                <strong>
                                    What's hoppin? Search by city or state to
                                    discover some cool local breweries!
                                </strong>
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Jumbotron;
