import useSWRMutation from "swr/mutation";
import Loading from "../components/Loading";
import { postFetcher } from "../services/data";
import { useAdddresss } from "../contexts/AddressProvider";

function AddressList({ addresses, isLoading, mutate, showDelete = true }) {
  const { trigger: deleteAddress, isMutating } = useSWRMutation(
    "auth/remove-address/",
    postFetcher
  );

  const { setAddress, active } = useAdddresss();

  if (isLoading) return <Loading classNames="h-32" />;

  return (
    <>
      <div className="flex flex-col gap-2 divide-y-2 divide-indigo-100">
        {" "}
        {addresses?.map?.((addr) => (
          <button
            onClick={
              showDelete
                ? () => {}
                : () => {
                    setAddress(addr, addresses);
                  }
            }
            key={addr.id}
            className={`py-2 text-stone-800 capitalize flex grow-0  items-center justify-between ${
              !showDelete ? "cursor-pointer" : "cursor-auto"
            } ${!showDelete && active?.id === addr.id ? "bg-indigo-100 " : ""}`}
          >
            <div className="flex flex-col items-start">
              <h4 className="text-xl tracking-tight font-light">
                {addr.district}
              </h4>{" "}
              <div className="flex gap-4">
                <span className="text-md">{addr.address}</span>
                <span className=" text-sm">{addr.complement}</span>{" "}
              </div>
            </div>
            {showDelete && (
              <button
                onClick={async () => {
                  await deleteAddress({ addressId: addr.id });
                  mutate();
                }}
                disabled={isMutating}
                className="justify-self-end px-2 py-1 bg-red-500 rounded-md text-lg text-slate-50 uppercase "
              >
                {isMutating ? "Deletando..." : "Deletar"}
              </button>
            )}
          </button>
        ))}
      </div>
    </>
  );
}

export default AddressList;
