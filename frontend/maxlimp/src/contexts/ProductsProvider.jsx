import { createContext, useContext, useReducer } from "react";

const initialState = {
  products: undefined,
  search: false,
  filterIsActive: false,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "defineProducts":
      return { ...state, products: action.payload };
    case "searchProducts":
      return {
        ...state,
        products: action.payload.products,
        search: action.payload.search,
      };
    case "cleanSearch":
      return { ...state, search: false };
    case "filterActive":
      return { ...state, filterIsActive: action.payload };
    default:
      return state;
  }
};

const ProductsContext = createContext();

const ProductsProvider = ({ children }) => {
  const [{ products, search, filterIsActive }, dispatch] = useReducer(
    authReducer,
    initialState
  );

  const searchProducts = (products, search) => {
    dispatch({ type: "searchProducts", payload: { products, search } });
  };
  const cleanSearch = () => {
    dispatch({ type: "cleanSearch" });
  };

  const setProducts = (payload) => {
    dispatch({ type: "defineProducts", payload });
  };

  const setFilter = (payload) => {
    dispatch({ type: "filterActive", payload });
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        searchProducts,
        search,
        setProducts,
        cleanSearch,
        filterIsActive,
        setFilter,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { ProductsProvider, useProducts };
