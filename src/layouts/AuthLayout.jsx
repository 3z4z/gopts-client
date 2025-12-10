import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="min-h-dvh flex items-center justify-center">
      <div className="max-w-lg w-full max-sm:px-3">
        <Outlet />
      </div>
    </div>
  );
}
