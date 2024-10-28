import logo from "../assets/logo.png";
import AuthButtons from "./AuthButtons";

import SearchInput from "./SearchInput";

import useSWR from "swr";
import { getFetcher } from "../services/data";
import { CiHeart, CiShoppingCart } from "react-icons/ci";
import UserBox from "./UserBox";
import { useAuth } from "../contexts/AuthProvider";
import { useEffect } from "react";

function HeaderHome() {
  const { data } = useSWR("auth/check-auth/", getFetcher);

  const { setUser } = useAuth();

  const user = data?.user;

  console.log(user);

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, []);

  return (
    <header className="flex px-12 py-8 justify-between items-center bg-indigo-50 gap-12">
      <img src={logo} alt="Maxlimp logo" className="h-12 w-12" />
      <SearchInput />
      {user ? (
        <>
          <div className="flex items-center justify-center gap-12">
            <CiHeart className="w-8 h-8 fill-indigo-600" />
            <CiShoppingCart className="w-8 h-8 fill-indigo-600" />
          </div>
          <UserBox user={user} />
        </>
      ) : (
        <AuthButtons />
      )}
    </header>
  );
}

export default HeaderHome;
