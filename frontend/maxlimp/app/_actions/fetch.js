"use server";

import { cookies } from "next/headers";

export default async function fetcs(data) {
  // Definindo o cookie diretamente no Server Component
  cookies().set({
    name: "token",
    value: JSON.stringify(data), // Converte o valor em string se for um objeto
    httpOnly: true,
    path: "/",
    expires: new Date(Date.now() + 60 * 60 * 24 * 120 * 1000), // 120 dias
    maxAge: 60 * 60 * 24 * 120, // 120 dias
  });
}
