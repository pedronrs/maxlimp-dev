import useSWRMutation from "swr/mutation";
import { postFetcher, patchFetcher } from "../services/data";
import { useNavigate } from "react-router";
import useAuthRedirect from "../hooks/useAuthRedirect";
import { useState } from "react";

function Profile() {
  useAuthRedirect("/perfil");
  const { trigger } = useSWRMutation("auth/logout/", postFetcher);

  const navigate = useNavigate();

  const handleLogout = async function () {
    await trigger();
    navigate("/entrar");
  };

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const { trigger: redefine } = useSWRMutation(
    "auth/redefine-password/",
    patchFetcher
  );

  const handleRedefinePassword = async function () {
    try {
      await redefine({ password, newPassword });
    } catch (error) {
      console.log(error);
      setError(error.error);
    }
  };
  return (
    <>
      <button onClick={handleLogout}>Logout</button>
      {error && <p>{error}</p>}
      <input
        value={password}
        type="text"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        value={newPassword}
        type="text"
        placeholder="newpassword"
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button onClick={handleRedefinePassword}>Redefinir</button>
    </>
  );
}

export default Profile;
