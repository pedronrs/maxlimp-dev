function ProductButton({ onClick, children, type }) {
  const styles =
    "w-full rounded-md px-6 py-2 bg-indigo-600 text-white transition-all duration-300 hover:bg-indigo-700 flex items-center justify-center gap-4 text-sm uppercase tracking-wide";
  if (type === "div") return <div className={styles}>{children}</div>;
  return (
    <button onClick={onClick} className={styles}>
      {children}
    </button>
  );
}

export default ProductButton;
