import logo from "../assets/logo.png";
import AuthButtons from "./AuthButtons";

import SearchInput from "./SearchInput";

import useSWR from "swr";
import { getFetcher } from "../services/data";
import { CiHeart, CiShoppingCart } from "react-icons/ci";
import UserBox from "./UserBox";
import { useAuth } from "../contexts/AuthProvider";
import { useEffect } from "react";
import SubHeaderHome from "./SubHeaderHome";

function HeaderHome({ showSearch = true }) {
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
    <header className=" px-12 bg-indigo-50 flex flex-col items-start justify-center">
      <div className="flex py-6 w-full justify-between items-center  gap-12">
        <img src={logo} alt="Maxlimp logo" className="h-12 w-12" />
        {showSearch && <SearchInput />}

        {user ? (
          <>
            <div
              className={`flex items-center justify-center gap-12 ${
                showSearch ? "" : "ml-auto"
              }`}
            >
              <CiHeart className="w-8 h-8 fill-indigo-600" />
              <CiShoppingCart className="w-8 h-8 fill-indigo-600" />
            </div>
            <UserBox user={user} />
          </>
        ) : (
          <AuthButtons />
        )}
      </div>
      <SubHeaderHome user={user} />
    </header>
  );
}

export default HeaderHome;
