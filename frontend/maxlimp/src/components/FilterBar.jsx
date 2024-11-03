import Category from "./Category";
import FilterBtn from "./FilterBtn";
import Slider from "@mui/material/Slider";

import { getFetcher, postFetcher } from "../services/data";

import useSWR from "swr";
import { useFilter } from "../contexts/FilterProvider";
import { useProducts } from "../contexts/ProductsProvider";

import useSWRMutation from "swr/mutation";
import { useEffect, useMemo } from "react";

function FilterBar() {
  const {
    categories,
    price,
    handleCategoryChange,
    setCategories,
    setPrice,
    initCategories,
  } = useFilter();

  const { setProducts, setFilter } = useProducts();

  const requestParams = {
    categories,
    price: { min: price[0], max: price[1] },
  };

  const { data: results, isLoading } = useSWR(
    `products/filter-results?filters=${JSON.stringify(requestParams)}`,
    getFetcher
  );

  const { trigger, data } = useSWRMutation(
    `products/filter-products/`,

    postFetcher
  );
  const products = useMemo(() => data, [data]);

  useEffect(() => {
    if (products !== undefined) {
      setProducts(products);
      setFilter(false);
    }
  }, [products]);

  return (
    <div className="px-8 py-4 border-t-2 border-r-2  border-indigo-500 flex flex-col justify-start items-start text-stone-800 gap-8 ">
      <h2 className="text-xl tracking-wide ">Filtros</h2>
      <div className="flex flex-col gap-6">
        {initCategories.map((category, i) => (
          <Category
            checked={categories.some((f) => f === category)}
            value={category}
            onChange={handleCategoryChange}
            key={i}
          />
        ))}
      </div>
      <div className="flex flex-col items-center self-center justify-center">
        <span className="text-lg text-stone-800 tracking-wide">
          R${price[0]}~R${price[1]}
        </span>
        <Slider
          max={150}
          min={0}
          getAriaLabel={() => "Temperature range"}
          value={price}
          onChange={(e, value) => {
            setPrice(value);
          }}
          valueLabelDisplay="auto"
          getAriaValueText={() => `R${price[0]}~R${price[1]}`}
        />
      </div>

      <div className="flex gap-4 flex-col self-center">
        {!isLoading ? (
          <span className="text-lg text-stone-800 font-light">
            {results?.length} resultados
          </span>
        ) : (
          <span className="text-lg text-stone-800 font-light">
            Carregando...
          </span>
        )}
        {categories?.length || price[0] !== 0 || price[1] !== 150 ? (
          <FilterBtn
            onClick={() => {
              setCategories([]);
              setPrice([0, 150]);
            }}
            text="limpar"
            className="bg-stone-600 border-stone-600 text-stone-50"
          />
        ) : (
          ""
        )}

        <FilterBtn
          onClick={async () => {
            await trigger(requestParams);
          }}
          text="aplicar"
          className="bg-indigo-600  border-indigo-600 text-slate-50"
        />
      </div>
    </div>
  );
}

export default FilterBar;
