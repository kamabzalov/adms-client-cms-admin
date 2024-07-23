/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from "react";
import { useLayout } from "../../core";
import { AsideMenu } from "./AsideMenu";

const AsideDefault: FC = () => {
  const { classes } = useLayout();

  return (
    <div className="aside">
      <div className="aside-menu flex-column-fluid">
        <AsideMenu asideMenuCSSClasses={classes.asideMenu} />
      </div>
    </div>
  );
};

export { AsideDefault };
