function Modal({ text, onSuccess, onCancel, disabled }) {
  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };
  return (
    <div
      onClick={handleBackgroundClick}
      className="bg-stone-900 bg-opacity-40 fixed top-0 left-0 right-0 bottom-0 z-50 backdrop-blur-sm"
    >
      <div className="text-stone-800 bg-indigo-50 rounded-lg p-4 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <p className="text-md tracking-wide">{text}</p>
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={onCancel}
            className="bg-red-500 text-indigo-50 rounded-md p-2"
          >
            Cancelar
          </button>
          <button
            disabled={disabled}
            onClick={onSuccess}
            className="bg-indigo-600 text-indigo-50 rounded-md p-2"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
