function BaseInput({ name, placeholder, value, setValue, bg, type }) {
  return (
    <div className="border-gray-800 border-2 rounded-md p-2 w-64 relative">
      <p
        className={`${
          bg || "bg-slate-100"
        } z-10 capitalize top-0 px-1 absolute translate-y-[-55%]`}
      >
        {name}
      </p>
      <input
        onChange={(e) => setValue(e.target.value)}
        value={value}
        type={type || "text"}
        placeholder={placeholder}
        className="outline-none border-0 w-full h-full bg-transparent"
      />
    </div>
  );
}

export default BaseInput;
