import { ToastContainer } from "react-toastify";
import Footer from "../components/Footer";
import HeaderHome from "../components/HeaderHome";
import HeroSection from "../components/HeroSection";
import ProductsContainer from "../products/ProductsContainer";
import 'react-toastify/dist/ReactToastify.css';

function Home() {
  return (
    <div>
      <ToastContainer/>
      <HeaderHome />
      <HeroSection />

      <div className="mt-24 mb-40 px-12">
        <ProductsContainer />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
