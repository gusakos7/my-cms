import { cookies } from "next/headers";

export default async function DashboardPage() {
  const token = cookies().get("access_token")?.value;

  if (!token) {
    return <p>You are not logged in</p>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Access Token: {token}</p>
    </div>
  );
}
