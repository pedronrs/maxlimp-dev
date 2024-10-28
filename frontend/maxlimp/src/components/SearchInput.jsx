import { FaBars } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";

function SearchInput() {
  return (
    <div className="rounded-full  w-full max-w-[700px] h-14 bg-indigo-600 flex gap-5 px-4 items-center justify-center">
      <FaBars strokeWidth="1px" className="fill-slate-50 w-6 h-6" />

      <input
        className="bg-transparent h-full placeholder:opacity-45 placeholder:text-slate-50 outline-none w-full text-slate-50"
        type="text"
        placeholder="Pesquise um produto"
      />

      <FaMagnifyingGlass strokeWidth="1px" className="fill-slate-50 w-6 h-6" />
    </div>
  );
}

export default SearchInput;
