/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

// import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export function DialogLogin() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add user</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        {/* <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
          Anyone who has this link will be able to view this.
          </DialogDescription>
          </DialogHeader> */}
        {/* <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
          <Label htmlFor="link" className="sr-only">
          Link
          </Label>
          <Input
          id="link"
          defaultValue="https://ui.shadcn.com/docs/installation"
          readOnly
          />
          </div>
          <Button type="submit" size="sm" className="px-3">
          <span className="sr-only">Copy</span>
          <Copy />
          </Button>
          </div> */}
        {/* start */}
        {/* <div className="w-full max-w-md space-y-8 rounded-lg border bg-card p-6 shadow-sm"> */}
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Create an Account</h1>
          <p className="text-sm text-muted-foreground">
            Enter your information below to create your account sdddddddddd
          </p>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first-name">First name</Label>
              <Input id="first-name" placeholder="John" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last-name">Last name</Label>
              <Input id="last-name" placeholder="Doe" required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input id="confirm-password" type="password" required />
          </div>
          <div className="flex items-center space-x-2">
            {/* <Checkbox id="terms" required /> */}
            <Label htmlFor="terms" className="text-sm font-normal">
              I agree to the{" "}
              <Link href="#" className="text-primary hover:underline">
                terms of service
              </Link>{" "}
              and{" "}
              <Link href="#" className="text-primary hover:underline">
                privacy policy
              </Link>
            </Label>
          </div>
          <Button type="submit" className="w-full">
            Create Account
          </Button>
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Login
            </Link>
          </div>
        </div>
        {/* </div> */}
        {/* <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
