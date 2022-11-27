export const routes = [
  {
    name: "Home",
    path: "/",
    requiredRoles: ["USER"],
  },
  {
    name: "About",
    path: "/",
    requiredRoles: ["ADMIN", "USER"],
  },
  {
    name: "Services",
    path: "/",
    requiredRoles: ["ADMIN"],
  },
  {
    name: "Pricing",
    path: "/",
    requiredRoles: ["ADMIN", "USER"],
  },
  {
    name: "Contact",
    path: "/",
    requiredRoles: ["ADMIN"],
  },
];
