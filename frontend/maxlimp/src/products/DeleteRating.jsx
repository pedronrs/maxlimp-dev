import useSWRMutation from "swr/mutation";
import { useAuth } from "../contexts/AuthProvider";
import { postFetcher } from "../services/data";

function DeleteRating({ product, setComments }) {
  const { user } = useAuth();
  const { trigger: deleteRating } = useSWRMutation(
    `products/delete-comment/`,
    postFetcher
  );

  return (
    <button
      onClick={async () => {
        await deleteRating({ id: product.id });
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.user.id !== user.id)
        );
      }}
      className="ml-3 w-min rounded-sm px-2 py-1 bg-red-500 text-slate-50 uppercase text-md"
    >
      deletar
    </button>
  );
}

export default DeleteRating;
