import { useState } from "react";
import AuthButton from "../auth/AuthButton";
import BaseInput from "../components/BaseInput";
import AuthLayout from "../auth/AuthLayout";
import { postFetcher } from "../services/data";
import useSWRMutation from "swr/mutation";
import AuthRessendCode from "../auth/AuthRessendCode";
import useAuthRedirect from "../hooks/useAuthRedirect";
import { useNavigate } from "react-router";

function ConfirmEmailCode() {
  useAuthRedirect();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [code, setCode] = useState("");

  const { trigger, isMutating } = useSWRMutation("auth/code/", postFetcher);

  const handleValidate = async function () {
    if (!code) return setError("Forneça o código.");

    try {
      await trigger({ code });
      navigate("/");
    } catch (error) {
      setError(error);
    }
  };

  return (
    <AuthLayout name="Validação">
      {error && <p className="text-sm text-red-500">{error}</p>}
      <BaseInput
        name="codigo"
        placeholder="421212"
        value={code}
        setValue={setCode}
      />

      <div>
        <AuthButton
          onClick={handleValidate}
          disabled={isMutating}
          name="confirmar"
        />
        <AuthRessendCode setError={setError}>
          Reenviar o código!
        </AuthRessendCode>
      </div>
    </AuthLayout>
  );
}

export default ConfirmEmailCode;
