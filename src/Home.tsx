import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import Main from "./Main/Main";

const HomeComponent = () => {
  return (
    <div className="z-1">
      <Header />
      <Main />
      <Footer />
    </div>
  );
};

export default HomeComponent;
