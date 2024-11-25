import AuthLayout from "../auth/AuthLayout";
import AuthButton from "../auth/AuthButton";
import BaseInput from "../components/BaseInput";
import { Link, useNavigate } from "react-router-dom";

import useAuthRedirect from "../hooks/useAuthRedirect";
import { useState } from "react";
import useSWRMutation from "swr/mutation";
import { postFetcher } from "../services/data";

function Login() {
  useAuthRedirect("/", "/entrar");

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const { trigger, isMutating } = useSWRMutation("auth/login/", postFetcher);

  const handleLogin = async function () {
    if (!password || !email) return setError("Preencha todos os campos!");

    setError("");
    try {
      await trigger({ email, password });
      navigate("/");
    } catch (error) {
      setError(error);
    }
  };

  return (
    <AuthLayout onSend={handleLogin} name="login">
      {error && <p className="text-sm text-red-500">{error}</p>}
      <BaseInput
        value={email}
        setValue={setEmail}
        name="email"
        placeholder="email@gmail.com"
      />
      <BaseInput
        value={password}
        setValue={setPassword}
        name="senha"
        placeholder="**********"
        type="password"
      />
      <div>
        <AuthButton disabled={isMutating} name="entrar" />
        <Link to="/registro" className="block text-gray-400 text-sm">
          Não tem uma conta?
        </Link>
      </div>
    </AuthLayout>
  );
}

export default Login;
