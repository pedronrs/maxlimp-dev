function Category({ value, checked, onChange }) {
  return (
    <>
      <input
        onChange={() => onChange(checked, value)}
        checked={checked}
        type="checkbox"
        id={value}
        className="filter-input hidden"
      />
      <label
        htmlFor={value}
        className="filter-label flex items-center justify-start gap-3 text-stone-800 text-md tracking-wide capitalize"
      >
        <div className="border-2 h-6 w-6 duration-300 transition-all border-stone-800 rounded-md"></div>
        {value}
      </label>
    </>
  );
}

export default Category;
