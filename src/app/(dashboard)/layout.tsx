import { getSession } from "@/actions";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  console.log({ session });
  return (
    <SidebarProvider>
      <AppSidebar session={session} variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="flex flex-1 flex-col gap-2">{children}</div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default DashboardLayout;
