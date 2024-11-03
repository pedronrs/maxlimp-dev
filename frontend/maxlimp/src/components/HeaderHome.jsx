import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useSWR from "swr";
import { CiShoppingCart } from "react-icons/ci";
import logo from "../assets/logo.png";
import AuthButtons from "./AuthButtons";
import SearchInput from "./SearchInput";
import UserBox from "./UserBox";
import { useAuth } from "../contexts/AuthProvider";
import { useCart } from "../contexts/CartContext";
import SubHeaderHome from "./SubHeaderHome";
import { getFetcher } from "../services/data";
import CartIcon from "./CartIcon";

function HeaderHome() {
  const { data } = useSWR("auth/check-auth/", getFetcher);
  const { setUser } = useAuth();
  const { cart } = useCart();

  const user = {
    name: 'david',
  };

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [setUser, user]);

  return (
    <header className="px-4 md:px-12 bg-indigo-50 flex flex-col items-start justify-center">
      <div className="flex py-6 w-full justify-between items-center gap-4 md:gap-12">
        <img src={logo} alt="Maxlimp logo" className="h-12 w-12" />
        <SearchInput className="flex-grow" /> {/* Expand SearchInput */}
        {user ? (
          <div className="flex items-center gap-4 md:gap-8">
            <CartIcon />
            <UserBox user={user} />
          </div>
        ) : (
          <AuthButtons />
        )}
      </div>
      <SubHeaderHome user={user} />
    </header>
  );
}

export default HeaderHome;
