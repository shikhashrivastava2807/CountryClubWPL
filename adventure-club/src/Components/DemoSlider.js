import React, {useState} from "react";
import Carousel from "react-bootstrap/Carousel"
function DemoSlider() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    const ImageHeight = 200;

    return (
        <Carousel activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item>
            <img className="d-block w-100"
                 src={require("../images/camp.jpg")}
                 style={{height:610+'px'}} 
                 mode='fit' /> 
                <Carousel.Caption>
                    <h3>Mountain Adventures</h3>
                    <p>
                    Explore the wonder of camping surrounded by the mountains
                    </p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block w-100"
                    src={require("../images/sfo.jpg")} 
                    style={{height:610+'px'}} 
                    mode='fit'/> 
                 <Carousel.Caption>
                    <h3>City Rush</h3>
                    <p>
                        Enjoy the busy life in the cities
                    </p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block w-100"
                    src={require("../images/golf.jpg")} 
                    style={{height:610+'px'}} 
                    mode='fit'/> 
                 <Carousel.Caption>
                    <h3>Golf Courses</h3>
                    <p>
                    Unwind after a long day with a game of golf
                    </p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block w-100"
                    src={require("../images/desert.jpg")} 
                    style={{height:610+'px'}} 
                    mode='fit'/> 
                 <Carousel.Caption>
                    <h3>Desert Adventures</h3>
                    <p>
                    Find adventure in the wonder of the desert with our club's retreats
                    </p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block w-100"
                    src={require("../images/beach.jpg")} 
                    style={{height:610+'px'}} 
                    mode='fit'/> 
                 <Carousel.Caption>
                    <h3>Beach Locations</h3>
                    <p>
                        Beautiful beaches... Lasting memories...
                    </p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
        
    );
}

export default DemoSlider;
