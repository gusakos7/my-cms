/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  apiKey: z.string().min(20, {
    message: "API key must be at least 20 characters.",
  }),
  apiSecret: z.string().min(30, {
    message: "API secret must be at least 30 characters.",
  }),
});

type ApiKeysFormValues = z.infer<typeof formSchema>;

export function ApiKeysForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const defaultValues: ApiKeysFormValues = {
    apiKey: "xxxxxxxxxxxxxxxxxxxx",
    apiSecret: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  };

  const form = useForm<ApiKeysFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  async function onSubmit(values: ApiKeysFormValues) {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);

      toast({
        title: "API keys updated",
        description: "Your API keys have been updated successfully.",
      });
    }, 1000);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>API Keys </CardTitle>
        <CardDescription>
          {" "}
          Manage your API keys for accessing external services{" "}
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="apiKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>API Key </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter API key"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="apiSecret"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>API Secret </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter API secret"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
