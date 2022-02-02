import React from "react";

const Brewing101 = () => (
    <div className="video-responsive">
        {/* [x_video_embed type="16:9" style="max-width: 450px; margin: 0 auto"] */}
        <iframe
            className="responsive-iframe my-0 mx-auto mw-100"
            type="16:9"
            src="https://www.youtube.com/embed/Voi7kOKxoss"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        ></iframe>
    </div>
);


export default Brewing101;
