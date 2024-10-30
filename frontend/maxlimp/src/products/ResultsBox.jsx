function ResultsBox({ children }) {
  return (
    <div className="absolute z-10 border-2 border-indigo-600 shadow-custom-light shadow-slate-800 bg-indigo-50 rounded-md px-4 py-2 bottom-0 left-0 w-full translate-y-[100%] divide-y-2 divide-indigo-300 tracking-wide text-stone-800 text-md max-h-96">
      {children}
    </div>
  );
}

export default ResultsBox;
