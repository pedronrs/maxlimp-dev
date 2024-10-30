function SearchButton({ children }) {
  return (
    <button className="duration-300 p-2 rounded-full transition-all hover:bg-indigo-900 flex items-center justify-center">
      {children}
    </button>
  );
}

export default SearchButton;
