import AuthLayout from "../auth/AuthLayout";
import AuthButton from "../auth/AuthButton";
import BaseInput from "../components/BaseInput";
import { Link, useNavigate } from "react-router-dom";

import useSWRMutation from "swr/mutation";

import { useState } from "react";
import { postFetcher } from "../services/data.js";
import useAuthRedirect from "../hooks/useAuthRedirect.js";

function Register() {
  useAuthRedirect();

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const { trigger, isMutating } = useSWRMutation("auth/register/", postFetcher);

  const handleRegister = async function () {
    if (!password || !email || !phone || !name)
      return setError("Preencha todos os campos!");

    setError("");
    try {
      await trigger({ name, phone, email, password });
      navigate("/validacao");
    } catch (error) {
      setError(error);
    }
  };

  return (
    <AuthLayout name="registro">
      {error && <p className="text-sm text-red-500">{error}</p>}
      <BaseInput
        name="nome"
        placeholder="George Russel"
        value={name}
        setValue={setName}
      />
      <BaseInput
        name="celular"
        placeholder="(21) 9899-9999"
        value={phone}
        setValue={(value) => {
          setPhone(value);
        }}
      />
      <BaseInput
        name="email"
        placeholder="email@gmail.com"
        value={email}
        setValue={setEmail}
      />
      <BaseInput
        name="senha"
        placeholder="**********"
        type="password"
        value={password}
        setValue={setPassword}
      />

      <div>
        <AuthButton
          disabled={isMutating}
          onClick={handleRegister}
          name="criar"
        />
        <Link to="/entrar" className="block text-gray-400 text-sm">
          Já tem uma conta?
        </Link>
      </div>
    </AuthLayout>
  );
}

export default Register;
