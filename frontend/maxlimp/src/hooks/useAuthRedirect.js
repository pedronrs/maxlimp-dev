import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import { getFetcher } from "../services/data.js";
import { useAuth } from "../contexts/AuthProvider.jsx";

function useAuthRedirect(successPath = "/", notAuthPath = "/registro") {
  const navigate = useNavigate();
  const { data, isLoading } = useSWR("auth/check-auth/", getFetcher);
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
