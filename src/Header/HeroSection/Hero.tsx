import { Container, createTheme, useMediaQuery } from "@mui/material";
import heroImage1 from "../Images/demo-home-fashion-slider-01.webp";
import React from "react";
import { useNavigate } from "react-router-dom";
import ButtonComp from "../../Components/Button";
import { GrLinkNext } from "react-icons/gr";

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const showProducts = () => {
    navigate("/Popular");
  };
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(70, 69, 69, 0), rgba(172, 172, 172, 0)), url(${heroImage1})`,
        backgroundSize: "cover",
        backgroundPosition: "right",
      }}
      className="min-h-[85vh] flex items-center justify-start "
    >
      <Container maxWidth={"xl"}>
        <div className="flex flex-col items-start md:items-center justify-center md:justify-center gap-6 text-white ">
          <p className="text-sm font-mono opacity-75">
            {" "}
            Festive season offers ongoing
          </p>
          <div className="flex flex-col text-[26px] sm:text-[32px] md:text-[4rem] font-serif">
            <span className="">Your all in one</span>
            <span className="">clothing solution!</span>
          </div>

          <div className="w-full max-w-[200px] md:max-w-[250px] text-xl">
            <ButtonComp
              label="View Products"
              onClick={() => showProducts()}
              outline
              custom
              iconFront={GrLinkNext}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Hero;
