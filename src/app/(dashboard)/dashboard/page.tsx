import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";

import data from "./data.json";
import { getUsers } from "@/actions";

export default async function Page() {
  console.log("ELAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAaa");
  const users = await getUsers();
  console.dir({ users }, { depth: 5 });

  const myData = users?.map((user: any) =>
    //   {
    //   id: user.id,
    //   name: user.name,
    //   email: user.email,
    //   status: user.status,
    //   role: user.role,
    // }
    ({
      id: 1,
      header: user.email,
      type: `${user.firstName} ${user.lastName}`,
      status: "In Process",
      target: "18",
      limit: "5",
      reviewer: "Eddie Lake",
    })
  );

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <SectionCards />
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive />
      </div>
      <DataTable users={users} data={data} />
    </div>
  );
}
