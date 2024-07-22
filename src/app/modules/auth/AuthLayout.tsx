/* eslint-disable jsx-a11y/anchor-is-valid */
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="d-flex flex-column flex-lg-row flex-column-fluid h-100">
      <div className="d-flex flex-column flex-lg-row-fluid w-lg-50 p-10 order-2 order-lg-1">
        <div className="d-flex flex-center flex-column flex-lg-row-fluid">
          <div className="w-lg-500px p-10">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export { AuthLayout };
