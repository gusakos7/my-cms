import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function getServerSession() {
  const accessToken = cookies().get('access_token')?.value;
  if (!accessToken) return null;

  try {
    return jwt.decode(accessToken);
  } catch {
    return null;
  }
}