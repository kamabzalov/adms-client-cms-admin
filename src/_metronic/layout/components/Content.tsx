import { FC } from "react";
import clsx from "clsx";
import { useLayout } from "../core";
import { WithChildren } from "../../helpers";

const Content: FC<WithChildren> = ({ children }) => {
  const { classes } = useLayout();

  return (
    <div
      id="kt_content_container"
      className={clsx(classes.contentContainer.join(" "))}
    >
      {children}
    </div>
  );
};

export { Content };
