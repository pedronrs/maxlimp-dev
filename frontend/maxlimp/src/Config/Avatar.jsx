import { FaUser } from "react-icons/fa";
import Loading from "../components/Loading";

import useSWRMutation from "swr/mutation";
import { deleteFetcher, putFileFetcher } from "../services/data";

import { useAuth } from "../contexts/AuthProvider";

function Avatar() {
  const { trigger, isMutating, error } = useSWRMutation(
    "auth/avatar/",
    putFileFetcher
  );

  const { trigger: remove, isMutating: removing } = useSWRMutation(
    "auth/remove-avatar/",
    deleteFetcher
  );

  const { updateUser, user } = useAuth();

  const { avatar, name } = user;

  async function handleAvatar(e) {
    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();

    formData.append("file", file);

    try {
      const response = await trigger(formData);

      updateUser({ avatar: response.fileUrl });
    } catch (e) {
      console.log(e);
    }
  }

  async function handleRemove() {
    try {
      await remove();

      updateUser({ avatar: "default" });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="flex flex-col gap-2 items-center justify-center">
      <h3 className="text-2xl mb-4 tracking-wide font-extralight capitalize">
        Avatar
      </h3>
      <input
        onInput={handleAvatar}
        className="hidden"
        type="file"
        id="imageInput"
        accept="image/*"
      />

      {error && <span className="text-red-500 text-sm">{error}</span>}
      {isMutating || removing ? (
        <Loading classNames="h-32" />
      ) : (
        <label className="cursor-pointer" htmlFor="imageInput">
          {avatar === "default" ? (
            <FaUser className="w-32 h-32 fill-indigo-600 rounded-md" />
          ) : (
            <img
              src={avatar}
              alt="Avatar"
              className="w-32 h-32 rounded-md overflow-hidden object-cover "
            />
          )}
        </label>
      )}

      {avatar === "default" || (
        <button
          onClick={handleRemove}
          disabled={removing}
          className="w-32 text-slate-50 bg-red-500 uppercase px-4 py-2 flex items-center justify-center"
        >
          apagar
        </button>
      )}
      <span className="text-sm capitalize tracking-wide max-w-xs overflow-hidden text-ellipsis">
        {name}
      </span>
    </div>
  );
}

export default Avatar;
