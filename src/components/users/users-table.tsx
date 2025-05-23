"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { UserDialog } from "./user-dialog";
import { DeleteConfirmDialog } from "./delete-confirm-dialog";
import { addUser, updateUser, deleteUser, toggleUserStatus } from "@/actions";
import { User } from "@/types";

interface UsersTableProps {
  initialUsers: User[];
}

export function UsersTable({ initialUsers }: UsersTableProps) {
  // Use initialUsers for initial state, but updates will come from server actions
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddUser = async (
    userData: Omit<User, "id"> & { password?: string; confirmPassword?: string }
  ) => {
    try {
      setIsSubmitting(true);
      const { email, firstName, lastName, password, confirmPassword } =
        userData;
      console.log({ password, confirmPassword });
      if (!password || !confirmPassword) {
        throw new Error("Password and confirm password are required.");
      }
      const newUser = await addUser({
        email,
        firstName,
        lastName,
        password,
        confirmPassword,
      });
      // Optimistically update UI
      setUsers([...users, newUser]);
      setIsAddDialogOpen(false);
    } catch (error) {
      console.error("Failed to add user:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditUser = async (updatedUser: User | Omit<User, "id">) => {
    try {
      setIsSubmitting(true);
      // Ensure updatedUser has an id (should always be the case for edit)
      if ("id" in updatedUser) {
        await updateUser(updatedUser as User);
        // Optimistically update UI
        setUsers(
          users.map((user) =>
            user.id === updatedUser.id ? (updatedUser as User) : user
          )
        );
        setIsEditDialogOpen(false);
        setSelectedUser(null);
      } else {
        console.error("Updated user is missing id.");
      }
    } catch (error) {
      console.error("Failed to update user:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteUser = async (id: string) => {
    try {
      setIsSubmitting(true);
      await deleteUser(id);
      // Optimistically update UI
      setUsers(users.filter((user) => user.id !== id));
      setIsDeleteDialogOpen(false);
      setSelectedUser(null);
    } catch (error) {
      console.error("Failed to delete user:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleStatus = async (id: string) => {
    try {
      await toggleUserStatus(id);
      // Optimistically update UI
      setUsers(
        users.map((user) =>
          user.id === id ? { ...user, isEnabled: !user.isEnabled } : user
        )
      );
    } catch (error) {
      console.error("Failed to toggle user status:", error);
    }
  };

  const openEditDialog = (user: User) => {
    setSelectedUser(user);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (user: User) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Roles</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={user.isEnabled}
                      onCheckedChange={() => handleToggleStatus(user.id)}
                    />
                    <span>{user.isEnabled ? "Enabled" : "Disabled"}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {user.roles.map((role) => (
                      <Badge key={role} variant="outline">
                        {role}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => openEditDialog(user)}
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => openDeleteDialog(user)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <UserDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSave={handleAddUser}
        title="Add New User"
        isSubmitting={isSubmitting}
      />

      {selectedUser && (
        <>
          <UserDialog
            open={isEditDialogOpen}
            onOpenChange={setIsEditDialogOpen}
            onSave={handleEditUser}
            title="Edit User"
            user={selectedUser}
            isSubmitting={isSubmitting}
          />
          <DeleteConfirmDialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
            onConfirm={() => handleDeleteUser(selectedUser.id)}
            userName={`${selectedUser.firstName} ${selectedUser.lastName}`}
          />
        </>
      )}
    </>
  );
}
