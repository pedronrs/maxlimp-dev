import useSWRMutation from "swr/mutation";
import { postFetcher } from "../services/data";

function AuthRessendCode({ children, setError }) {
  const { trigger, isMutating } = useSWRMutation(
    "http://127.0.0.1:8000/api/auth/recode/",
    postFetcher
  );

  const handleValidate = async function () {
    try {
      await trigger();
    } catch (error) {
      setError(error);
    }
  };
  return (
    <button
      onClick={handleValidate}
      disabled={isMutating}
      className="block text-gray-400 text-sm"
    >
      {children}
    </button>
  );
}

export default AuthRessendCode;
