function DangerRow({ title, children }) {
  return (
    <div>
      <h3 className="text-lg tracking-wide font-extralight capitalize">
        {title}
      </h3>
      <div className=" flex ml-2 gap-4 items-center justify-start">
        {children}
      </div>
    </div>
  );
}

export default DangerRow;
