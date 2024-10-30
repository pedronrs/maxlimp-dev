import Footer from "../components/Footer";
import HeaderHome from "../components/HeaderHome";
import HeroSection from "../components/HeroSection";
import ProductsContainer from "../products/ProductsContainer";

function Home() {
  return (
    <div>
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
