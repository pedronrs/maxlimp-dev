import ProductSearchResult from "./ProductSearchResult";
import ResultsBox from "./ResultsBox";

function SearchResults({ products = [], query }) {
  if (query === "") {
    return <ResultsBox>Insira um termo para pesquisar!</ResultsBox>;
  }
  if (products.length === 0) {
    return <ResultsBox>Nenhum resultado encontrado!</ResultsBox>;
  }

  console.log(products);

  return (
    <ResultsBox cla>
      {products.map((product) => (
        <ProductSearchResult key={product.name} product={product} />
      ))}
    </ResultsBox>
  );
}

export default SearchResults;
