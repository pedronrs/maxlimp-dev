import { createContext, useContext, useReducer } from "react";

const initialState = {
  active: null,
};

const AdddresssReducer = (state, action) => {
  switch (action.type) {
    case "setActive":
      return { ...state, active: action.payload };
    default:
      return state;
  }
};

const AdddresssContext = createContext();

const AdddresssProvider = ({ children }) => {
  const [{ active }, dispatch] = useReducer(AdddresssReducer, initialState);

  const setAddress = (id, addresses) => {
    dispatch({
      type: "setActive",
      payload:
        addresses?.find((ad) => {
          return ad.id === id.id;
        }).id === active?.id
          ? null
          : id,
    });
  };

  return (
    <AdddresssContext.Provider value={{ active, setAddress }}>
      {children}
    </AdddresssContext.Provider>
  );
};

const useAdddresss = () => {
  const context = useContext(AdddresssContext);
  if (!context) {
    throw new Error("useAdddresss must be used within an AdddresssProvider");
  }
  return context;
};

export { AdddresssProvider, useAdddresss };
