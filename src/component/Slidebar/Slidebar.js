import React, { useEffect, useState } from "react";
import "./Slidebar.css";
import imageSlide from "../data";
import Button from "../Button/Button";
import { Carousel } from 'react-bootstrap';


function Slidebar() {
  const [curentState, setCurrentState] = useState(0);
  const bgImageStyle = {
    backgroundImage: `url(${imageSlide[curentState].url})`,
    backgroundPostion: "center",
    backgroundSize: "cover",
    height: "100%",
  };

  const goToNext = (curentState) => {

    setCurrentState(curentState);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      if (curentState == 2) {

        setCurrentState(0);
      } else {
        setCurrentState(curentState + 1);
      }
    }, 4000);
    return () => clearTimeout(timer);
  }, [curentState]);
  return (
    <>
      <br />
      <br />
      <br />
      
      <Carousel>
        <Carousel.Item>
          <img src="/1.png" width={100 + '%'} />
          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src="/2.jpg" width={100 + '%'} />
          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src="/3.jpg" width={100 + '%'} />
          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <div className="description1" dir="rtl">
        <div>
          <h3>{imageSlide[curentState].title}</h3>
          <p>{imageSlide[curentState].body}</p>
        </div>
        <a href="/BookNow"> <Button data="احجز الآن" className="btn_booknow" /></a>
      </div>
    </>
  );
}

export default Slidebar;
