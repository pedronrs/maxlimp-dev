import useSWRMutation from "swr/mutation";
import { postFetcher } from "../services/data";

function AuthRessendCode({ children, setError, setRessended, ressended }) {
  const { trigger, isMutating } = useSWRMutation("auth/recode/", postFetcher);

  const handleValidate = async function () {
    if (ressended) setError("Você já solicitou o reenvio do código.");
    try {
      await trigger();
      setRessended(true);
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
