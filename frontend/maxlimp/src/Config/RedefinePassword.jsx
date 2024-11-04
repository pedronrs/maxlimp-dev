import BaseInput from "../components/BaseInput";

import useSWRMutation from "swr/mutation";

import { patchFetcher } from "../services/data";
import { useEffect, useState } from "react";

function RedefinePassword() {
  const {
    trigger,
    isMutating,
    data,
    error: defaultError,
  } = useSWRMutation("auth/redefine-password/", patchFetcher);

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState(defaultError?.error);

  console.log(error);

  useEffect(() => {
    if (data?.message) {
      setMessage(data?.message);
    }
  }, [data]);

  return (
    <form
      action="/"
      onSubmit={async (e) => {
        e.preventDefault();
        setError("");
        try {
          await trigger({ password, newPassword });
        } catch (error) {
          setError(error?.error);
        }
      }}
      className="flex flex-col gap-4"
    >
      <h3 className="mt-6 text-lg tracking-wide font-extralight capitalize">
        Redefinir Senha
      </h3>
      {error && <p className="text-sm text-red-500">{error}</p>}
      {message && <p className="text-sm text-green-500">{message}</p>}
      <div className="ml-2  flex flex-col gap-6">
        <BaseInput
          setValue={setPassword}
          value={password}
          bg="bg-slate-50"
          type="password"
          name="Senha atual"
          placeholder="********"
        />
        <BaseInput
          setValue={setNewPassword}
          value={newPassword}
          bg="bg-slate-50"
          type="password"
          name="Nova Senha"
          placeholder="********"
        />{" "}
        <button
          disabled={!(newPassword && password) || isMutating}
          className="disabled:opacity-50 bg-indigo-600 text-slate-50 text-md uppercase px-2 py-1 rounded-md w-min"
        >
          Redefinir
        </button>
      </div>
    </form>
  );
}

export default RedefinePassword;
