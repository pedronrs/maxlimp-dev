import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import { getFetcher } from "../services/data.js";

function useAuthRedirect(successPath = "/", notAuthPath = "/registro") {
  const navigate = useNavigate();
  const { data } = useSWR("auth/check-auth/", getFetcher);

  console.log(data);

  useEffect(() => {
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
  }, [data, navigate, successPath, notAuthPath]);

  return data;
}

export default useAuthRedirect;
