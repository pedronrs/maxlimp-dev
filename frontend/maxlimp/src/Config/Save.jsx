import useSWRMutation from "swr/mutation";
import { putFetcher } from "../services/data";
import { useState } from "react";

function Save({ name, phone, reset, show, setError }) {
  const { trigger, isMutating } = useSWRMutation("auth/update/", putFetcher);

  if (!show) return null;
  return (
    <>
      <div className="flex items-center justify-start gap-6 mt-10 text-xl">
        <button
          onClick={reset}
          className="px-4 py-2 rounded-md bg-stone-600 text-slate-50 uppercase"
        >
          redefinir
        </button>
        <button
          onClick={async () => {
            setError("");
            try {
              await trigger({ name, phone });
            } catch (e) {
              setError(e.error);
            }
            reset();
          }}
          disabled={isMutating}
          className="px-4 py-2 rounded-md bg-indigo-600 text-slate-50 uppercase"
        >
          salvar
        </button>
      </div>
    </>
  );
}

export default Save;
