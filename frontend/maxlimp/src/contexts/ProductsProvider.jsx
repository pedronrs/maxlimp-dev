import { createContext, useContext, useReducer } from "react";

const initialState = {
  products: null,
  search: false,
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
      return { ...state, products: [], search: false };
    default:
      return state;
  }
};

const ProductsContext = createContext();

const ProductsProvider = ({ children }) => {
  const [{ products, search }, dispatch] = useReducer(
    authReducer,
    initialState
  );

  const searchProducts = (products, search) => {
    dispatch({ type: "searchProducts", payload: { products, search } });
  };
  const cleanSearch = () => {
    dispatch({ type: "cleanSearch" });
  };

  return (
    <ProductsContext.Provider
      value={{ products, searchProducts, search, cleanSearch }}
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
