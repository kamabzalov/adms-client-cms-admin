import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { LayoutProvider, LayoutSplashScreen } from "../_metronic/layout/core";
import { AuthInit } from "./modules/auth";
import { ThemeModeProvider } from "../_metronic/partials";

const App = () => {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <LayoutProvider>
        <ThemeModeProvider>
          <AuthInit>
            <Outlet />
          </AuthInit>
        </ThemeModeProvider>
      </LayoutProvider>
    </Suspense>
  );
};

export { App };
