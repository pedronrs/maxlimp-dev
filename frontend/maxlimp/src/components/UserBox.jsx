import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

function UserBox({ user }) {
  return (
    <Link
      to="/configuracoes"
      className="flex items-center justify-center flex-col gap-2 text-indigo-600"
    >
      {user.avatar === "default" ? (
        <FaUser className="w-8 h-8 fill-indigo-600" />
      ) : (
        <img
          src={user.avatar || 'https://imgs.search.brave.com/Od1mOiOVIdshqrLcUx0S1-BoN-dMcwU-Rs4XLQVk-uM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvZmVhdHVy/ZWQvZ29qby1zYXRv/cnUtcGljdHVyZXMt/OHN6NjJobHNnMWVw/bmk2bC5qcGc'}
          alt="User avatar"
          className="w-8 h-8 rounded-full"
        />
      )}

      <span className="text-md tracking-wide capitalize max-w-16 text-ellipsis overflow-hidden ">
        {user.name.trim().split(" ")[0]}
      </span>
    </Link>
  );
}

export default UserBox;
