function FilterBtn({ onClick, text, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={
        "px-4 py-1 self-center rounded-md border-2 uppercase text-lg tracking-tight " +
        className
      }
    >
      {text}
    </button>
  );
}

export default FilterBtn;
