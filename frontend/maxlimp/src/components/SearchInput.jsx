import { FaBars, FaCopy } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";

import { getFetcher } from "../services/data";
import useSWR from "swr";
import { useState } from "react";
import SearchResults from "../products/SearchResults";
import { useProducts } from "../contexts/ProductsProvider";
import SearchButton from "./SearchButton";
import { useFilter } from "../contexts/FilterProvider";

function SearchInput() {
  const { cleanSearch, searchProducts, setFilter, filterIsActive } =
    useProducts();

  const { categories, price } = useFilter();
  const [focus, setFocus] = useState(false);
  const [query, setQuery] = useState("");

  const requestParams = {
    categories,
    price: { min: price[0], max: price[1] },
  };

  const { data: products } = useSWR(
    query
      ? `products/fuzzy-products?query=${query.trim()}&filters=${JSON.stringify(
          requestParams
        )}`
      : null,
    getFetcher
  );

  console.log(focus);

  return (
    <form
      action="/"
      onSubmit={(e) => {
        e.preventDefault();
        if (query.trim() === "") cleanSearch();
        else searchProducts(products, query);

        setQuery("");
        setFilter(false);
        setFocus(false);
      }}
      className={`
       rounded-md
       w-full max-w-[700px] h-14 bg-indigo-600 flex gap-5 px-4 items-center justify-center relative`}
    >
      <button
        type="button"
        onClick={() => {
          setFilter(!filterIsActive);
        }}
      >
        <FaBars strokeWidth="1px" className="fill-slate-50 w-6 h-6" />
      </button>

      <input
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        className="bg-transparent h-full placeholder:opacity-45 placeholder:text-slate-50 outline-none w-full text-slate-50"
        type="text"
        placeholder="Pesquise um produto"
      />

      <SearchButton>
        <FaMagnifyingGlass
          strokeWidth="1px"
          className="fill-slate-50 w-6 h-6"
        />
      </SearchButton>

      {focus ? <SearchResults query={query.trim()} products={products} /> : ""}
    </form>
  );
}

export default SearchInput;
