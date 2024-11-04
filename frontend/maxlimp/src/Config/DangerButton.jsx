function DangerButton({ onClick, name, disabled }) {
  return (
    <button
      disabled={disabled}
      className="disabled:opacity-50 mt-4 uppercase text-md bg-red-500 text-slate-50 rounded-md px-2 py-1"
      onClick={onClick}
    >
      {name}
    </button>
  );
}

export default DangerButton;
