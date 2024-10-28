import AuthImg from "./AuthImg";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

function AuthLayout({ name, children }) {
  return (
    <div className="bg-indigo-600 w-[100dvw] h-[100dvh] flex items-center justify-center">
      <div className="w-[80%] login-box rounded-md bg-slate-50 p-14 grid grid-cols-[auto_1fr] shadow-[#1f293726]  shadow-md gap-20">
        <div className="rounded-md  max-h-[650px] overflow-auto bg-slate-100 shadow-[#1f293726] shadow-md p-8 flex flex-col gap-12 items-center justify-center">
          <div className="mb-6 justify-center items-center gap-6 flex ">
            <Link to="/">
              <img src={logo} alt="Maxlimp logo" className="h-10 w-10" />
            </Link>
            <h1 className="uppercase text-xl ">{name}</h1>
          </div>
          {children}
        </div>
        <AuthImg />
      </div>
    </div>
  );
}

export default AuthLayout;
