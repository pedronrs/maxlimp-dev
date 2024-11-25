import FilterBar from "../components/FilterBar";
import { ToastContainer } from "react-toastify";
import Footer from "../components/Footer";
import HeaderHome from "../components/HeaderHome";
import HeroSection from "../components/HeroSection";
import { useProducts } from "../contexts/ProductsProvider";
import ProductsContainer from "../products/ProductsContainer";
import 'react-toastify/dist/ReactToastify.css';

function Home() {
  const { filterIsActive } = useProducts();
  return (
    <div>
      <ToastContainer/>
      <HeaderHome />
      <div className={`${filterIsActive ? "flex" : "block"}`}>
        {filterIsActive && <FilterBar />}
        <div>
          <HeroSection />
          <div className="mt-24 mb-40 px-12">
            <ProductsContainer />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
