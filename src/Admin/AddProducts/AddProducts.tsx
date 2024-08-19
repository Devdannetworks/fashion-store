import React from "react";
import AdminNav from "../AdminNav/AdminNav";
import { Container } from "@mui/material";
import Footer from "../../Footer/Footer";
import FormWrap from "../../Main/Register/FormWrap";
import AddProductForm from "../../Components/AddProductForm";

const AddProducts = () => {
  return (
    <div>
      {" "}
      <div className="relative flex flex-col min-h-screen">
        <AdminNav />
        <Container maxWidth={"xl"} className="flex-grow">
          <FormWrap>
            <AddProductForm />
          </FormWrap>
        </Container>
        <Footer />
      </div>
    </div>
  );
};

export default AddProducts;
