import FilterBar from "../components/FilterBar";
import Footer from "../components/Footer";
import HeaderHome from "../components/HeaderHome";
import HeroSection from "../components/HeroSection";
import { useProducts } from "../contexts/ProductsProvider";
import ProductsContainer from "../products/ProductsContainer";

function Home() {
  const { filterIsActive } = useProducts();
  return (
    <div>
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
