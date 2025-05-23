"use server"


import { User, UserResponse } from "@/types";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const BASE_URL = "https://localhost/api/auth";

export async function getUsers() {
  const accessToken = cookies().get("access_token")?.value;
  const refreshToken = cookies().get("refresh_token")?.value;
  const res = await fetch(`https://localhost/api/users`, {
    method: "GET",
    headers: {
      Cookie: `access_token=${accessToken}; refresh_token=${refreshToken}`,
    },
  });
  const data = await res.json();
  if (!res.ok) {
    console.log({ error: data?.errors && data?.errors[0].msg });
    return null;
  }
  return data;
}

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
    console.dir({ err }, { depth: null })
    throw new Error(err.errors && err.errors[0].message || 'Registration failed');
  }

  return res.json();
}

export const getSession = async () => {
  const accessToken = cookies().get("access_token")?.value;
  const refreshToken = cookies().get("refresh_token")?.value;
  const res = await fetch(`${BASE_URL}/session`, {
    method: 'GET',
    headers: {
      Cookie: `access_token=${accessToken}; refresh_token=${refreshToken}`,
    },
  });
  const data = await res.json();
  if (!res.ok) {
    console.log({ error: data.errors[0].msg });
    return null;
  }
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
  // redirect("/")
}


export async function addUser(
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
    console.dir({ err }, { depth: null })
    throw new Error(err.errors && err.errors[0].message || 'Registration failed');
  }

  return res.json();
}

export async function updateUser(user: User): Promise<User> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || ""}${BASE_URL}/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `API error: ${response.status}`)
    }

    const data = (await response.json()) as UserResponse

    if (!data.success || !data.data?.user) {
      throw new Error(data.message || "Failed to update user")
    }

    revalidatePath("/admin/users")
    return data.data.user
  } catch (error) {
    console.error("Failed to update user:", error)
    throw error
  }
}

export async function deleteUser(id: string): Promise<void> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || ""}${BASE_URL}/${id}`, {
      method: "DELETE",
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `API error: ${response.status}`)
    }

    const data = await response.json()

    if (!data.success) {
      throw new Error(data.message || "Failed to delete user")
    }

    revalidatePath("/admin/users")
  } catch (error) {
    console.error("Failed to delete user:", error)
    throw error
  }
}

export async function toggleUserStatus(id: string): Promise<void> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || ""}${BASE_URL}/${id}/toggle-status`, {
      method: "PATCH",
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `API error: ${response.status}`)
    }

    const data = await response.json()

    if (!data.success) {
      throw new Error(data.message || "Failed to toggle user status")
    }

    revalidatePath("/admin/users")
  } catch (error) {
    console.error("Failed to toggle user status:", error)
    throw error
  }
}
