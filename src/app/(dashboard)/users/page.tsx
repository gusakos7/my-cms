// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-explicit-any */

// import { ChartAreaInteractive } from "@/components/chart-area-interactive";
// import { DataTable } from "@/components/data-table";
// import { SectionCards } from "@/components/section-cards";

// // import data from "./data.json";
// // import data from "./../dashboard/data.json";
// import { getUsers } from "@/actions";

// export default async function Page() {
//   console.log("ELAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAaa");
//   const users = await getUsers();
//   console.dir({ users }, { depth: 5 });

//   const myData = users?.map((user: any) =>
//     //   {
//     //   id: user.id,
//     //   name: user.name,
//     //   email: user.email,
//     //   status: user.status,
//     //   role: user.role,
//     // }
//     ({
//       id: user.keycloakId,
//       header: user.email,
//       type: `${user.firstName} ${user.lastName}`,
//       status: "In Process",
//       target: "18",
//       limit: "5",
//       reviewer: "Eddie Lake",
//     })
//   );

//   return (
//     <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
//       {/* <SectionCards /> */}
//       {/* <div className="px-4 lg:px-6">
//         <ChartAreaInteractive />
//       </div> */}
//       <DataTable users={users} data={myData} />
//     </div>
//   );
// }
import { getUsers } from "@/actions";
import { UsersTable } from "@/components/users/users-table";

export default async function UsersPage() {
  // Fetch users on the server
  const users = await getUsers();
  // const initialUsers = await getUsers()

  return (
    <div className="container mx-auto py-10 px-4 lg:px-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Users Management</h1>
      </div>

      {/* Pass users to client component */}
      <UsersTable initialUsers={users} />
    </div>
  );
}
