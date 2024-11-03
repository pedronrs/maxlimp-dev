import { createContext, useContext, useReducer } from "react";

const initialState = {
  initCategories: [
    "sabão",
    "detergente",
    "esponja",
    "amaciante",
    "lixos",
    "toalha",
  ],
  categories: [],
  price: [0, 150],
};

const filterReducer = (state, action) => {
  switch (action.type) {
    case "categories":
      return { ...state, categories: action.payload };
    case "price":
      return { ...state, price: action.payload };
    default:
      return state;
  }
};

const FilterContext = createContext();

const FilterProvider = ({ children }) => {
  const [{ price, categories, initCategories }, dispatch] = useReducer(
    filterReducer,
    initialState
  );

  function handleCategoryChange(checked, value) {
    if (checked) {
      dispatch({
        type: "categories",
        payload: categories.filter((filter) => filter !== value),
      });
    } else {
      dispatch({ type: "categories", payload: [...categories, value] });
    }
  }

  function setPrice(value) {
    dispatch({ type: "price", payload: value });
  }

  function setCategories(value) {
    dispatch({ type: "categories", payload: value });
  }

  return (
    <FilterContext.Provider
      value={{
        categories,
        price,
        handleCategoryChange,
        setCategories,
        setPrice,
        initCategories,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilter must be used within an FilterProvider");
  }
  return context;
};

export { FilterProvider, useFilter };
