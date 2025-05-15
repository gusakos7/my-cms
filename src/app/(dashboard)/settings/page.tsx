import type { Metadata } from "next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GeneralSettingsForm } from "@/components/settings/general-settings-form";
import { NotificationsForm } from "@/components/settings/notifications-form";
import { AppearanceForm } from "@/components/settings/appearence-form";
import { ApiKeysForm } from "@/components/settings/api-key-form";

export const metadata: Metadata = {
  title: "Settings",
  description: "Manage your CMS settings",
};

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
      {/* <div className="flex flex-col gap-4"> */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your CMS settings and preferences
        </p>
      </div>
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-4 grid w-full grid-cols-4 lg:w-[600px]">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="api">API Keys</TabsTrigger>
        </TabsList>
        <TabsContent value="general" className="mt-0">
          <GeneralSettingsForm />
        </TabsContent>
        <TabsContent value="notifications" className="mt-0">
          <NotificationsForm />
        </TabsContent>
        <TabsContent value="appearance" className="mt-0">
          <AppearanceForm />
        </TabsContent>
        <TabsContent value="api" className="mt-0">
          <ApiKeysForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
