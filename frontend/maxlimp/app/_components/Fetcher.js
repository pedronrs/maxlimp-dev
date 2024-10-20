"use client";

import axios from "axios";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
} from "@tanstack/react-query";
import { useState } from "react";

const queryClient = new QueryClient();

export default function Fetcher() {
  return (
    <QueryClientProvider client={queryClient}>
      <InnerFetcher />
    </QueryClientProvider>
  );
}

function InnerFetcher() {
  const registerMutation = useMutation({
    mutationFn: async (newUser) => {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/auth/register/",
        newUser,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      return response.data;
    },
  });

  const resendCodeMutation = useMutation({
    mutationFn: async (email) => {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/auth/recode/",
        { email },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    },
  });

  const verifyCodeMutation = useMutation({
    mutationFn: async ({ email, code, password, phone, name }) => {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/auth/code/",
        { email, code, password, phone, name },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (credentials) => {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/auth/login/",
        credentials,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/auth/logout/",
        {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    },
  });

  const redefinePasswordMutation = useMutation({
    mutationFn: async ({ password, newPassword }) => {
      const response = await axios.patch(
        "http://127.0.0.1:8000/api/auth/redefine-password/",
        { password, newPassword },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    },
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: async (email) => {
      const response = await axios.patch(
        "http://127.0.0.1:8000/api/auth/forgot-password/",
        { email },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    },
  });

  const deleteAccountMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.delete(
        "http://127.0.0.1:8000/api/auth/delete-account/",
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    },
  });

  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleRegister = () => {
    registerMutation.mutate({
      email: "sergiolima68ft@gmail.com",
      name: "Test.name",
      password: "fasfsafsafa",
      phone: "2312231233",
    });
  };

  const handleResendCode = () => {
    resendCodeMutation.mutate("sergiolima68ft@gmail.com");
  };

  const handleVerifyCode = () => {
    verifyCodeMutation.mutate({
      email: "sergiolima68ft@gmail.com",
      code: code,
      password: "fasfsafsafa",
      phone: "2312231233",
      name: "Test.name",
    });
  };

  const handleLogin = () => {
    loginMutation.mutate({
      email: "sergiolima68ft@gmail.com",
      password: "fasfsafsafa",
    });
  };

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const handleRedefinePassword = () => {
    redefinePasswordMutation.mutate({
      password: password,
      newPassword: newPassword,
    });
  };

  const handleForgotPassword = () => {
    forgotPasswordMutation.mutate("sergiolima68ft@gmail.com");
  };

  const handleDeleteAccount = () => {
    deleteAccountMutation.mutate();
  };

  return (
    <div>
      <button onClick={handleRegister} disabled={registerMutation.isLoading}>
        Registrar
      </button>
      <button
        onClick={handleResendCode}
        disabled={resendCodeMutation.isLoading}
      >
        Reenviar Código
      </button>
      <button
        onClick={handleVerifyCode}
        disabled={verifyCodeMutation.isLoading}
      >
        Verificar Código
      </button>
      <button onClick={handleLogin} disabled={loginMutation.isLoading}>
        Login
      </button>
      <button onClick={handleLogout} disabled={logoutMutation.isLoading}>
        Logout
      </button>
      <button
        onClick={handleRedefinePassword}
        disabled={redefinePasswordMutation.isLoading}
      >
        Redefinir Senha
      </button>
      <button
        onClick={handleForgotPassword}
        disabled={forgotPasswordMutation.isLoading}
      >
        Esqueci a Senha
      </button>
      <button
        onClick={handleDeleteAccount}
        disabled={deleteAccountMutation.isLoading}
      >
        Excluir Conta
      </button>
      {registerMutation.isError && (
        <div>Error: {registerMutation.error.message}</div>
      )}
      {registerMutation.isSuccess && <div>Usuário registrado com sucesso!</div>}
      {resendCodeMutation.isError && (
        <div>Error: {resendCodeMutation.error.message}</div>
      )}
      {resendCodeMutation.isSuccess && <div>Código reenviado com sucesso!</div>}
      {verifyCodeMutation.isError && (
        <div>Error: {verifyCodeMutation.error.message}</div>
      )}
      {verifyCodeMutation.isSuccess && (
        <div>Código verificado com sucesso!</div>
      )}
      {loginMutation.isError && <div>Error: {loginMutation.error.message}</div>}
      {loginMutation.isSuccess && <div>Usuário logado com sucesso!</div>}
      {logoutMutation.isError && (
        <div>Error: {logoutMutation.error.message}</div>
      )}
      {logoutMutation.isSuccess && <div>Usuário deslogado com sucesso!</div>}
      {redefinePasswordMutation.isError && (
        <div>Error: {redefinePasswordMutation.error.message}</div>
      )}
      {redefinePasswordMutation.isSuccess && (
        <div>Senha redefinida com sucesso!</div>
      )}
      {forgotPasswordMutation.isError && (
        <div>Error: {forgotPasswordMutation.error.message}</div>
      )}
      {forgotPasswordMutation.isSuccess && (
        <div>Email enviado com sucesso!</div>
      )}
      {deleteAccountMutation.isError && (
        <div>Error: {deleteAccountMutation.error.message}</div>
      )}
      {deleteAccountMutation.isSuccess && (
        <div>Conta excluída com sucesso!</div>
      )}
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Insira o código"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Senha atual"
      />
      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="Nova senha"
      />
    </div>
  );
}
