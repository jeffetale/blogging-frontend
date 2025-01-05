// src/components/about-components/Button/index.jsx

import React from "react";
import PropTypes from "prop-types";

const shapes = {
  round: "rounded-[14px]",
};

const variants = {
  fill: {
    amber_900: "bg-amber-900 text-white-a700",
  },
};

const sizes = {
  xs: "h-[74px] px-[34px] text-[24px]",
};

const Button = ({
  children,
  className = "",
  leftIcon,
  rightIcon,
  shape,
  variant = "fill",
  size = "xs",
  color = "amber_900",
  ...restProps
}) => {
  return (
    <button
      className={`${className} flex flex-row items-center justify-center sm:px-4 text-center cursor-pointer`}
      {...restProps}
    >
      {!!leftIcon && leftIcon}
      {children}
      {!!rightIcon && rightIcon}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  shape: PropTypes.oneOf(["round"]),
  size: PropTypes.oneOf(["xs"]),
  variant: PropTypes.oneOf(["fill"]),
};

export { Button };
