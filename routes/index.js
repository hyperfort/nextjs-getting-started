export const routes = [
  {
    name: "Dashboard",
    path: "/",
    requiredRoles: ["USER", "ADMIN"],
  },
  {
    name: "Users",
    path: "/users",
    requiredRoles: ["ADMIN"],
  },
  {
    name: "Products",
    path: "/products",
    requiredRoles: ["ADMIN", "USER"],
  },
];
