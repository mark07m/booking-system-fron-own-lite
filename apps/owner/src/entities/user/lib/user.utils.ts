import { User } from "./model/user.types";

export const getUserDisplayName = (user: User): string => {
  return user.name || user.email;
};

export const getUserInitials = (user: User): string => {
  const name = getUserDisplayName(user);
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export const getUserRoleLabel = (role: User["role"]): string => {
  const roleLabels = {
    admin: "Администратор",
    manager: "Менеджер",
    user: "Пользователь",
  };
  return roleLabels[role];
};

export const isUserActive = (user: User): boolean => {
  return user.isActive;
};

export const canUserManageUsers = (user: User): boolean => {
  return user.role === "admin" || user.role === "manager";
};

export const canUserDeleteUsers = (user: User): boolean => {
  return user.role === "admin";
};
