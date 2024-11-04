import { FaUser } from "react-icons/fa";

function Avatar({ avatar }) {
  return (
    <>
      <input className="hidden" type="file" id="imageInput" accept="image/*" />
      <label className="cursor-pointer" htmlFor="imageInput">
        {avatar === "default" ? (
          <FaUser className="w-32 h-32 fill-indigo-600 rounded-md" />
        ) : (
          <img
            src={avatar}
            alt="Avatar"
            className="w-24 h-24 rounded-md overflow-hidden object-cover "
          />
        )}
      </label>
    </>
  );
}

export default Avatar;
