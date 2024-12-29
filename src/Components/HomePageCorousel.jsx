import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import banner from "../assets/hulchullbanner.jpeg";
import logo from '../assets/hulchulllogo2.jpeg'
import Image from "react-bootstrap/Image";

function HomePageCorousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <>
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item key={1} className="corousal-style">
        {/* <img
                            className="d-block w-100 corousal-style"
                            src={banner}
                            alt="error"
                            width="800px"
                            height="400px"
                            /> */}
        <Image src={banner} text="Second slide" fluid />
          <Carousel.Caption className="gradient-style">
            {/* <h5>Hai</h5>
            <p>{"fgfggd".slice(0, 100)}</p> */}
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
        <Image src={banner} text="Second slide" fluid />
          {/* <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption> */}
        <Carousel.Caption className="gradient-style">
            {/* <h5>Hai</h5>
            <p>{"fgfggd".slice(0, 100)}</p> */}
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image src={logo} text="Third slide" fluid />
          {/* <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption> */}
        <Carousel.Caption className="gradient-style">
            {/* <h5>Hai</h5>
            <p>{"fgfggd".slice(0, 100)}</p> */}
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      </>
  );
}

export default HomePageCorousel;
