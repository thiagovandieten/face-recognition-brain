import React from "react";
import Tilt from "react-parallax-tilt";
import Brain from './logo_brain.png';

const Logo = () => {

    return(
        <Tilt tiltMaxAngleX={45} tiltMaxAngley={45}>
            <div className="ma4 mt0 br2 shadow-2" style={{"height": "150px", "width":"150px", "background": "linear-gradient(to left, #9eebcf,  #FFDFDF )"}}>
                <img src={Brain} alt="logo"></img>
            </div>
        </Tilt>
    )
}

export default Logo;