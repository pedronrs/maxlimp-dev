import { createContext, useContext, useReducer } from "react";

// const userData = {
//   name: "david balzarini",
//   avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcCGwn7OaGLrYEhq7x8e23MKax0K1enwDFnw&s",
//   phone: "99999-3707",
//   email: "davidpereira2302@gmail.com",
//   type: 'admin'
// }

const initialState = {
  //user: userData,
  user: null,
};


const authReducer = (state, action) => {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [{ user }, dispatch] = useReducer(authReducer, initialState);

  const setUser = (user) => {
    dispatch({ type: "login", payload: user });
  };

  const updateUser = (change) => {
    dispatch({ type: "login", payload: { ...user, ...change } });
  };

  return (
    <AuthContext.Provider value={{ updateUser, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
