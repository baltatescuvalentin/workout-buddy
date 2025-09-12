import { redirect } from "react-router";

export function guestMiddleware() {
  const persistedRoot = localStorage.getItem("persist:root");

  if (!persistedRoot) return redirect("/login");

  if (persistedRoot) {
    try {
      const parsed = JSON.parse(persistedRoot);

      const parsedToken = parsed.token ? JSON.parse(parsed.token) : null;
      if (parsedToken.length > 2) {
        return redirect("/");
      }
    } catch {
      return redirect("/");
    }
  }
}
