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
        <h2 className="text-2xl text-indigo-600 font-semibold uppercase  tracking-tight mb-6">
          em destaque
        </h2>
        <ProductsContainer />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
