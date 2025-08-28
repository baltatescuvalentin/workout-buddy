import { redirect } from "react-router";

export function authMiddleware() {
  const persistedRoot = localStorage.getItem("persist:root");

  if (!persistedRoot) return redirect("/login");

  if (persistedRoot) {
    try {
      const parsed = JSON.parse(persistedRoot);
      console.log(typeof parsed.token, parsed.token);
      const parsedToken = parsed.token ? JSON.parse(parsed.token) : null;
      if (parsedToken.length < 3) {
        return redirect("/login");
      }

      return null;
    } catch {
      return redirect("/login");
    }
  }
}
