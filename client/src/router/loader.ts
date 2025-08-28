import { redirect } from "react-router";
import { authMiddleware } from "../middlewares/AuthMiddleware";

export function requireAuth() {
  if (!authMiddleware()) {
    return redirect("/login");
  }

  return null;
}

export function requireGuest() {
  if (authMiddleware()) {
    return redirect("/");
  }

  return null;
}
