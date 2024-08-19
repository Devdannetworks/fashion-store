import { Box, Typography, useMediaQuery } from "@mui/material";
import CollectionImage from "../Images/Collection.webp";
import logo1 from "../Images/clients-01.webp";
import logo2 from "../Images/clients-02.webp";
import logo3 from "../Images/clients-03.webp";
import logo4 from "../Images/clients-04.webp";
import ButtonComp from "../../Components/Button";
import { useNavigate } from "react-router-dom";
import HeadersComp from "../../Components/Headers";

const Brands: React.FC = () => {
  const isDesktop = useMediaQuery("(min-width: 800px)");

  const navigate = useNavigate();
  const showProducts = () => {
    navigate("/Shop");
  };
  return (
    <div className="flex flex-col gap-6">
      <div>
        <HeadersComp label="COLLECTIONS" />
      </div>
      <div className="flex flex-col md:flex-row gap-4 md:gap-40">
        <Box>
          <img
            src={CollectionImage}
            alt="Collection"
            width={!isDesktop ? "100%" : "auto"}
          />
        </Box>
        <hr className="border-slate-300 border-[1px] md:h-[470px]" />
        <Box
          style={{
            padding: "16px 0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h5">Popular brands in our</Typography>
          <Typography variant="h5">collection</Typography>
          <Typography
            variant="body1"
            style={{ margin: "24px 0", textAlign: "center" }}
          >
            We stock products from leading clothing brands <br /> all over the
            world including upcoming brands
            <br /> see popular brands in our <br />
            collection.
          </Typography>

          <div className="max-w-[250px]">
            <ButtonComp
              label="Shop Collection"
              onClick={() => showProducts()}
            />
          </div>
        </Box>
      </div>
      <Box
        sx={{
          display: "flex",
          flexDireection: "row",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        <img
          src={logo1}
          alt="client one"
          width={"195"}
          height={"56"}
          style={{ margin: "16px" }}
        />
        <img
          src={logo2}
          alt="client one"
          width={"195"}
          height={"56"}
          style={{ margin: "16px" }}
        />
        <img
          src={logo3}
          alt="client one"
          width={"195"}
          height={"56"}
          style={{ margin: "16px" }}
        />
        <img
          src={logo4}
          alt="client one"
          width={"195"}
          height={"56"}
          style={{ margin: "16px" }}
        />
      </Box>
    </div>
  );
};

export default Brands;
