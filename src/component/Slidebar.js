import React, { useEffect, useState } from "react";
import "./Slidebar.css";
import imageSlide from "./data";
import Button from "./Button";

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
    <div className="container-slidebar">
      <div className="wrapper">
        <div>
          <span className="dot">
          </span>
        </div>
        <div>
          <span className="dot"></span>
        </div>
        <div>
          <span className="dot"></span>
        </div>
        <div>
          <span className="dot"></span>
        </div>
        <div>
          <span className="dot"></span>
        </div>
        <div>
          <span className="dot"></span>
        </div>
        <div>
          <span className="dot"></span>
        </div>
        <div>
          <span className="dot"></span>
        </div>
        <div>
          <span className="dot"></span>
        </div>
        <div>
          <span className="dot"></span>
        </div>
        <div>
          <span className="dot"></span>
        </div>
        <div>
          <span className="dot"></span>
        </div>
        <div>
          <span className="dot"></span>
        </div>
        <div>
          <span className="dot"></span>
        </div>
        <div>
          <span className="dot"></span>
        </div>
        <div>
          <span className="dot"></span>
        </div>
        <div>
          <span className="dot"></span>
        </div>
        <div>
          <span className="dot"></span>
        </div>
        <div>
          <span className="dot"></span>
        </div>
        <div>
          <span className="dot"></span>
        </div>
      </div>
      <div className="container-style">
        <div style={bgImageStyle}> </div>
        <div className="transparent-background"> </div>

        <div className="description">
          <div>
            <h1>{imageSlide[curentState].title}</h1>
            <p>{imageSlide[curentState].body}</p>
          </div>
          <Button data="احجز الآن" />
          <div className="span-all">
            <div className="carousel-boullt">
              {imageSlide.map((imageSlide, curentState) => (
                <span
                  key={curentState}
                  onClick={() => goToNext(curentState)}
                ></span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Slidebar;
