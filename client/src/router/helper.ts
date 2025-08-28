import { routes } from "./routes";

export const matchRoute = (pathname: string) => {
  const name = Object.entries(routes).find(
    ([name, path]) => path === pathname
  )?.[0];

  return name ?? "home";
};
