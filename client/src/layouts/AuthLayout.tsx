import { Outlet } from "react-router";

function AuthLayout() {
  return (
    <div className="m-auto max-w-[640px] pt-0 sm:pt-22">
      <Outlet />
    </div>
  );
}

export default AuthLayout;
