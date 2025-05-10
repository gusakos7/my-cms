"use server"


import { cookies } from "next/headers";

const BASE_URL = "https://localhost/api/auth";
export async function login({ email, password }: { email: string; password: string }) {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("Login failed");

  const data = await res.json();
  console.log({ data })
  cookies().set("access_token", data.access_token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 60 * 60 * 24, // 1 day
    path: "/",
  });
  cookies().set("refresh_token", data.refresh_token_token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 60 * 60 * 24, // 1 day
    path: "/",
  });

  return { success: true };
}


export async function register(
  { email, password, firstName, lastName, confirmPassword }: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    confirmPassword: string;
  }) {
  const res = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    body: JSON.stringify({ email, password, firstName, lastName, confirmPassword }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Registration failed');
  }

  return res.json();
}

export const getSession = async () => {
  const token = cookies().get("access_token")?.value;
  const res = await fetch(`${BASE_URL}/session`, {
    method: 'GET',
    headers: {
      Cookie: `access_token=${token}`,
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.errors[0].msg || 'Session expired');
  // if (!res.ok) throw new Error(data.errors[0].msg || 'Session expired');
  return data;
}

export const logout = async () => {
  const refreshToken = cookies().get("refresh_token")?.value;
  const accessToken = cookies().get("access_token")?.value;
  const res = await fetch(`${BASE_URL}/logout`, {
    method: 'POST',
    headers: {
      Cookie: `refresh_token=${refreshToken}; access_token=${accessToken}`,
    },
  });
  if (!res.ok) throw new Error('Logout failed');
  cookies().delete("access_token");
  cookies().delete("refresh_token");
}