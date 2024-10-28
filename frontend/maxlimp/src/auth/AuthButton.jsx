import Loading from "../components/Loading";

function AuthButton({ name, onClick, disabled }) {
  return (
    <button
      disabled={disabled}
      className={`duration-300 transition-all rounded-md p-2 w-64 text-slate-50 flex items-center justify-center
        border-2  border-indigo-600 uppercase tracking-wider ${
          disabled ? "bg-transparent" : "hover:bg-indigo-700 bg-indigo-600 "
        }`}
      onClick={onClick}
    >
      {disabled ? <Loading classNames="h-4" /> : name}
    </button>
  );
}

export default AuthButton;
