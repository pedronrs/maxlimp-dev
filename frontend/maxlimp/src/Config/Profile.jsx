import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthProvider";
import Avatar from "./Avatar";
import DangerRow from "./DangerRow";
import DeleteAccount from "./DeleteAccount";
import Logout from "./Logout";
import ProfileRow from "./ProfileRow";
import RedefinePassword from "./RedefinePassword";
import Save from "./Save";

function justNumber(string) {
  return `${string}`.replace(/[^0-9]/g, "");
}

function Profile() {
  const { user } = useAuth();

  const [isLoading, setIsLoading] = useState(true);

  const [upName, setUpName] = useState("");
  const [upPhone, setUpPhone] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [canSave, setCanSave] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      const { name, phone: cd, email, avatar } = user;
      setUpName(name);
      setEmail(email);
      setAvatar(avatar);
      setUpPhone(Number(cd));
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (!isLoading) {
      verifySave();
    }
  }, [upName, upPhone, isLoading]);

  function verifySave() {
    console.log(+justNumber(upPhone), Number(user.phone), "^^^^^^^");
    if (upName !== user.name || +justNumber(upPhone) !== Number(user.phone)) {
      setCanSave(true);
    } else {
      setCanSave(false);
    }
  }

  function reset() {
    setUpName(user.name);
    setUpPhone(+justNumber(user.phone));
    setCanSave(false);
  }

  if (isLoading) return <p>Carregando perfil...</p>;

  return (
    <div className="grid grid-cols-[1fr_auto]">
      <div>
        <div className="flex flex-col gap-6">
          {error && <p className="text-sm text-red-500">{error}</p>}
          <ProfileRow
            set={(e) => {
              setUpName(e.target.value);
              verifySave();
            }}
            title="Nome"
            description="Seu Nome"
            type="text"
            value={upName}
          />{" "}
          <DangerRow title="email">
            {" "}
            <p className="text-md tracking-wide font-light capitalize">
              Seu email
            </p>{" "}
            <span
              className={`outline-none border-2 border-indigo-600 rounded-md py-1
               text-md  px-1 max-w-96 text-ellipsis overflow-hidden`}
            >
              {email}
            </span>
          </DangerRow>
          <ProfileRow
            set={(e) => {
              setUpPhone(+justNumber(e.target.value));
            }}
            title="telefone"
            description="Seu telefone"
            type="text"
            value={upPhone}
          />
        </div>
        <div className="flex flex-col gap-6">
          <RedefinePassword />
          <Logout />
          <DeleteAccount />
          <Save
            setShow={setCanSave}
            setError={setError}
            name={upName}
            phone={upPhone}
            show={canSave}
            reset={reset}
          />
        </div>
      </div>
      <div className="flex flex-col items-end justify-start">
        <Avatar />
      </div>
    </div>
  );
}

export default Profile;
