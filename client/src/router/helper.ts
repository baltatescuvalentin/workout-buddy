import { routes } from "./routes";

export const matchRoute = (pathname: string) => {
  const name = Object.entries(routes).find(([name, path]) => {
    return path === pathname || pathname.includes(path);
  })?.[0];

  return name ?? "home";
};
