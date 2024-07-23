/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect } from "react";
import noUiSlider, { target } from "nouislider";
import { useLayout } from "../../core";

const HeaderToolbar = () => {
  const { classes } = useLayout();

  useEffect(() => {
    const slider: target = document.querySelector(
      "#kt_toolbar_slider",
    ) as target;
    const rangeSliderValueElement: Element | null = document.querySelector(
      "#kt_toolbar_slider_value",
    );

    if (!slider) {
      return;
    }

    slider.innerHTML = "";

    noUiSlider.create(slider, {
      start: [5],
      connect: [true, false],
      step: 1,
      range: {
        min: [1],
        max: [10],
      },
    });

    slider.noUiSlider?.on("update", function (values: any, handle: any) {
      if (!rangeSliderValueElement) {
        return;
      }

      rangeSliderValueElement.innerHTML = parseInt(values[handle]).toFixed(1);
    });
  }, []);

  return (
    <div className="toolbar d-flex align-items-stretch">
      <div
        className={`${classes.headerContainer.join(
          " ",
        )} py-6 py-lg-0 d-flex flex-column flex-lg-row align-items-lg-stretch justify-content-lg-between`}
      ></div>
    </div>
  );
};

export { HeaderToolbar };
