import { FaBars } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";

import { getFetcher } from "../services/data";
import useSWR from "swr";
import { useState } from "react";
import SearchResults from "../products/SearchResults";
import { useProducts } from "../contexts/ProductsProvider";
import SearchButton from "./SearchButton";

function SearchInput() {
  const { cleanSearch, searchProducts } = useProducts();
  const [focus, setFocus] = useState(false);
  const [query, setQuery] = useState("");

  const { data: products } = useSWR(
    query ? `products/fuzzy-products?query=${query.trim()}` : null,
    getFetcher
  );

  return (
    <form
      action="/"
      onSubmit={(e) => {
        e.preventDefault();
        if (query.trim() === "") cleanSearch();
        else searchProducts(products, query);

        setQuery("");
        setFocus(false);
      }}
      className={`
       rounded-md
       w-full max-w-[700px] h-14 bg-indigo-600 flex gap-5 px-4 items-center justify-center relative`}
    >
      <FaBars strokeWidth="1px" className="fill-slate-50 w-6 h-6" />

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

      {products?.length || focus ? (
        <SearchResults query={query.trim()} products={products} />
      ) : (
        ""
      )}
    </form>
  );
}

export default SearchInput;
