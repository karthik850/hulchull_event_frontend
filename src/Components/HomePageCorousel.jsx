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
        <Image src="https://lh3.googleusercontent.com/d/1UPfZUNcifM06Uke7TnG3zLNKWaqpOdD-=w1000?authuser=1/view" className="corousal-image" text="Second slide" fluid />
          <Carousel.Caption className="gradient-style">
            {/* <h5>Hai</h5>
            <p>{"fgfggd".slice(0, 100)}</p> */}
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
        <Image src="https://lh3.googleusercontent.com/d/1VFfm1x-RGVTF8UkZregqTvAGhnh8BqAU=w1000?authuser=1/view" className="corousal-image" text="Second slide" fluid />
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
          <Image src="https://lh3.googleusercontent.com/d/1NgeLrtccyl8_VcM1EP3NgNXO1CpXgCZQ=w1000?authuser=1%2Fview" className="corousal-image" text="Third slide" fluid />
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
