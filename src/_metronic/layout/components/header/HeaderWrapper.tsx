/* eslint-disable react-hooks/exhaustive-deps */
import clsx from "clsx";
import { Link } from "react-router-dom";
import { toAbsoluteUrl } from "../../../helpers";
import { useLayout } from "../../core";

export function HeaderWrapper() {
  const { classes, attributes } = useLayout();

  return (
    <div
      className={clsx(
        "header",
        classes.header.join(" "),
        "align-items-stretch",
      )}
      {...attributes.headerMenu}
    >
      <div className="header-brand">
        <Link to="/">
          <img
            alt="Logo"
            src={toAbsoluteUrl("/media/logos/default-dark.svg")}
            className="h-25px h-lg-25px"
          />
        </Link>
      </div>
    </div>
  );
}
