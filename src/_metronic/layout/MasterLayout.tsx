import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Content } from "./components/Content";
import { PageDataProvider } from "./core";
import { MenuComponent } from "../assets/ts/components";
import { HeaderWrapper } from "./components/header/HeaderWrapper";
import { AsideDefault } from "./components/aside/AsideDefault";

const MasterLayout = () => {
  const location = useLocation();

  useEffect(() => {
    setTimeout(() => {
      MenuComponent.reinitialization();
    }, 500);
  }, [location.key]);

  return (
    <PageDataProvider>
      <div className="page d-flex flex-row flex-column-fluid">
        <AsideDefault />
        <div className="wrapper d-flex flex-column flex-row-fluid">
          <HeaderWrapper />

          <div className="content d-flex flex-column flex-column-fluid">
            <div className="post d-flex flex-column-fluid">
              <Content>
                <Outlet />
              </Content>
            </div>
          </div>
        </div>
      </div>
    </PageDataProvider>
  );
};

export { MasterLayout };
