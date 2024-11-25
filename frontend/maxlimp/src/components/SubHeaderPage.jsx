import { Link } from "react-router-dom";

function SubHeaderPage({ children, to, active, onClick }) {
  const customStyles = active ? "before:w-full" : "";
  return (
    <Link
      onClick={onClick}
      className={`text-md tracking-wide relative before:duration-300 before:transition-all text-indigo-600 ${
        customStyles || "before:w-0 hover:before:w-full"
      } before:h-[2px] before:left-0 before:rounded-sm before:bottom-[-2px] before:bg-indigo-600 before:absolute`}
      to={to}
    >
      {children}
    </Link>
  );
}

export default SubHeaderPage;
