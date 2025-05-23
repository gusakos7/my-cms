"use client";

import { useState, useEffect } from "react";
import { Check, ChevronsUpDown, Loader2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { type User, Role } from "@/types";

interface UserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (user: User | Omit<User, "id">) => void;
  title: string;
  user?: User;
  isSubmitting?: boolean;
}

export function UserDialog({
  open,
  onOpenChange,
  onSave,
  title,
  user,
  isSubmitting = false,
}: UserDialogProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);
  const [roles, setRoles] = useState<Role[]>([Role.USER]);
  const [openRoleSelector, setOpenRoleSelector] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isEditMode = !!user;

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setIsEnabled(user.isEnabled);
      setRoles(user.roles);
      // Reset password fields in edit mode
      setPassword(user.password!);
      setConfirmPassword(user.confirmPassword);
    } else {
      // Reset form for new user
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setIsEnabled(true);
      setRoles([Role.USER]);
    }
    setErrors({});
  }, [user, open]);
  console.log({ user });

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!firstName.trim()) newErrors.firstName = "First name is required";
    if (!lastName.trim()) newErrors.lastName = "Last name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";

    // Only validate password for new users or if password field is not empty in edit mode
    if (!isEditMode || password) {
      if (!password) {
        newErrors.password = "Password is required";
      } else if (password.length < 8) {
        newErrors.password = "Password must be at least 8 characters";
        // } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
        //   newErrors.password =
        //     "Password must include uppercase, lowercase, and numbers";
      }

      if (!confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
      } else if (password !== confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    if (roles.length === 0) newErrors.roles = "At least one role is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    if (user) {
      const updatedUser: User = {
        ...user,
        firstName,
        lastName,
        email,
        isEnabled,
        roles,
      };

      // Only include password if it was changed
      if (password) {
        updatedUser.password = password;
      }

      onSave(updatedUser);
    } else {
      onSave({
        firstName,
        lastName,
        email,
        password,
        isEnabled,
        roles,
      });
    }
  };

  const toggleRole = (role: Role) => {
    if (roles.includes(role)) {
      setRoles(roles.filter((r) => r !== role));
    } else {
      setRoles([...roles, role]);
    }
  };

  const availableRoles = Object.values(Role);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="firstName"
                className={errors.firstName ? "text-destructive" : ""}
              >
                First Name
              </Label>
              <Input
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="John"
                className={errors.firstName ? "border-destructive" : ""}
                required
              />
              {errors.firstName && (
                <p className="text-xs text-destructive">{errors.firstName}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="lastName"
                className={errors.lastName ? "text-destructive" : ""}
              >
                Last Name
              </Label>
              <Input
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Doe"
                className={errors.lastName ? "border-destructive" : ""}
                required
              />
              {errors.lastName && (
                <p className="text-xs text-destructive">{errors.lastName}</p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className={errors.email ? "text-destructive" : ""}
            >
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john.doe@example.com"
              className={errors.email ? "border-destructive" : ""}
              required
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email}</p>
            )}
          </div>

          {/* Password field */}
          <div className="space-y-2">
            <Label
              htmlFor="password"
              className={errors.password ? "text-destructive" : ""}
            >
              {isEditMode
                ? "New Password (leave blank to keep current)"
                : "Password"}
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={cn(
                  "pr-10",
                  errors.password ? "border-destructive" : ""
                )}
                required={!isEditMode}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
                <span className="sr-only">
                  {showPassword ? "Hide password" : "Show password"}
                </span>
              </Button>
            </div>
            {errors.password ? (
              <p className="text-xs text-destructive">{errors.password}</p>
            ) : (
              <p className="text-xs text-muted-foreground">
                Password must be at least 8 characters and include uppercase,
                lowercase, and numbers.
              </p>
            )}
          </div>

          {/* Confirm Password field */}
          <div className="space-y-2">
            <Label
              htmlFor="confirmPassword"
              className={errors.confirmPassword ? "text-destructive" : ""}
            >
              Confirm Password
            </Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className={cn(
                  "pr-10",
                  errors.confirmPassword ? "border-destructive" : ""
                )}
                // required={!isEditMode || !!password}
                // disabled={!password && isEditMode}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={!password && isEditMode}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
                <span className="sr-only">
                  {showConfirmPassword ? "Hide password" : "Show password"}
                </span>
              </Button>
            </div>
            {errors.confirmPassword && (
              <p className="text-xs text-destructive">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <div className="flex items-center space-x-2">
              <Switch
                checked={isEnabled}
                onCheckedChange={setIsEnabled}
                id="user-status"
              />
              <Label htmlFor="user-status">
                {isEnabled ? "Enabled" : "Disabled"}
              </Label>
            </div>
          </div>
          <div className="space-y-2">
            <Label className={errors.roles ? "text-destructive" : ""}>
              Roles
            </Label>
            <Popover open={openRoleSelector} onOpenChange={setOpenRoleSelector}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openRoleSelector}
                  className={cn(
                    "w-full justify-between",
                    errors.roles ? "border-destructive" : ""
                  )}
                >
                  {roles.length > 0 ? roles.join(", ") : "Select roles..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search roles..." />
                  <CommandList>
                    <CommandEmpty>No role found.</CommandEmpty>
                    <CommandGroup>
                      {availableRoles.map((role) => (
                        <CommandItem
                          key={role}
                          value={role}
                          onSelect={() => toggleRole(role)}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              roles.includes(role) ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {role}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            {errors.roles && (
              <p className="text-xs text-destructive">{errors.roles}</p>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSave} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
