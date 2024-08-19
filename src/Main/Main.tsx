import { Container } from "@mui/material";
import Products from "./Products/Products";
import Brands from "./Brands/Brands";
import Blogs from "./Blog/Blogs";

const Main: React.FC = () => {
  return (
    <Container maxWidth={"xl"}>
      <Products />
      <Brands />
      <Blogs />
    </Container>
  );
};

export default Main;
