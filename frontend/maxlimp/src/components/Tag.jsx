function Tag({ name }) {
  return (
    <div className="rounded-full px-2 py-1 bg-indigo-600 text-sm text-slate-50 uppercase tracking-wide flex items-center  gap-2 justify-center">
      {name}
    </div>
  );
}

export default Tag;
