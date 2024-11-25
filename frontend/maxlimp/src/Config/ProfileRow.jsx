import { useState } from "react";
import DangerRow from "./DangerRow";

function ProfileRow({ title, description, value, type, set }) {
  const [plain, setPlain] = useState(true);
  return (
    <div>
      <DangerRow title={title}>
        <p className="text-md tracking-wide font-light capitalize">
          {description}
        </p>
        {plain ? (
          <span
            onClick={() => setPlain(false)}
            className={`outline-none border-2 border-indigo-600 rounded-md py-1 ${
              type !== "email" ? "capitalize" : ""
            } text-md  px-1 max-w-96 text-ellipsis overflow-hidden`}
          >
            {value}
          </span>
        ) : (
          <input
            onChange={set}
            autoFocus
            onBlur={() => setPlain(true)}
            value={value}
            type={type}
            className={`w-60 outline-none border-2 border-indigo-600 rounded-md py-1 ${
              type !== "email" ? "capitalize" : ""
            } text-md px-1`}
          />
        )}
      </DangerRow>
    </div>
  );
}

export default ProfileRow;
