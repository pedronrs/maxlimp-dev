import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import { getFetcher } from "../services/data.js";
import { useAuth } from "../contexts/AuthProvider.jsx";

function useAuthRedirect(successPath = "/", notAuthPath = "/registro") {
  // const userData = {
  //   user: {
  //     name: "david balzarini",
  //     avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcCGwn7OaGLrYEhq7x8e23MKax0K1enwDFnw&s",
  //     phone: "99999-3707",
  //     email: "davidpereira2302@gmail.com"
  //   }
  // }
  const navigate = useNavigate();
  const { data, isLoading } = useSWR("auth/check-auth/", getFetcher);
  //const { data, isLoading } = useState(userData);
  const { setUser } = useAuth();

  const user = useMemo(() => data?.user, [data]);

  useEffect(() => {
    if (user && !isLoading) {
      setUser(user);
    }
  }, [user, isLoading]);

  useEffect(() => {
    if (isLoading) return;
    switch (data?.type) {
      case "authenticated":
        navigate(successPath);
        break;
      case "notAuthenticated":
        navigate(notAuthPath);
        break;
      case "authenticating":
        navigate("/validacao");
        break;
      default:
        break;
    }
  }, [data, navigate, successPath, notAuthPath, isLoading]);

  return data;
}

export default useAuthRedirect;
