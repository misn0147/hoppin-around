import React from "react";
import Brewing101 from "./Brewing101";

function Home() {
    const trivia = [
        {
            question: "What is the most sold beer in the United States?",
            answer: "Bud Light",
        },
        {
            question:
                "According to the 1516 German purity law, beer can only contain three ingredients. What are they?",
            answer: "Water, hops and barley. While yeast was a part of the process, it wasn’t considered to be an ingredient.",
        },
        {
            question: "Which country consumes the most beer per capita?",
            answer: "Czech Republic",
        },
        {
            question:
                "In which German city is the world’s biggest beer festival, Oktoberfest, traditionally celebrated?",
            answer: "Munich",
        },
        {
            question:
                "Brewmeister’s Snake Venom is claimed to be the strongest beer in the world. How many percent alcohol by volume (ABV) does it have?",
            answer: "67.5%",
        },
        {
            question:
                " In the early days, beer was only available to buy in kegs and bottles. Which brewery was the first to sell beer in cans in the United States?",
            answer: "Krueger Brewing Company, from Newark, New Jersey, who first sold beer in cans in 1935.",
        },
    ];

    return (
        <>
            <div className="App">
            <h2 className="subtitle-font pl-2">Learn to Brew</h2>
                <Brewing101 />
            </div>
            <h2 className="subtitle-font pl-2">Beer Trivia</h2>
            <div className="container mb-5">
                <div className="row">
                    {trivia.map((question) => (
                        <div className="flip-card m-2" key={question.question}>
                            <div className="flip-card-inner">
                                <div className="flip-card-front">
                                    <h5 className="p-3">{question.question}</h5>
                                </div>
                                <div className="flip-card-back">
                                    <h5 className="p-4">{question.answer}</h5>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
export default Home;
