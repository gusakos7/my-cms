/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getSession, logout } from "@/actions";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SessionProvider } from "@/contexts/session-context";
import { getServerSession } from "@/lib/get-server-session";
import React, { useEffect } from "react";

async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();
  console.log("🚀 ~ DashboardLayout ~ session:", session);

  return (
    <SessionProvider session={session}>
      <SidebarProvider>
        <AppSidebar session={null} variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col">
            <div className="flex flex-1 flex-col gap-2">{children}</div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </SessionProvider>
  );
}

export default DashboardLayout;
