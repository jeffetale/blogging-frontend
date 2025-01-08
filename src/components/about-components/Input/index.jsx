// src/components/about-components/Input/index.jsx

import React from "react";
import PropTypes from "prop-types";

const shapes = {
  round: "rounded-[14px]",
};

const variants = {
  fill: {
    gray_100: "bg-gray-100 text-gray-600",
  },
};

const sizes = {
  xs: "h-[74px] px-6 text-[21px]",
};

const Input = React.forwardRef(
  (
    {
      className = "",
      name = "",
      placeholder = "",
      type = "text",
      label = "",
      prefix,
      suffix,
      onChange,
      shape,
      variant = "fill",
      size = "xs",
      color = "gray_100",
      ...restProps
    },
    ref
  ) => {
    return (
      <label
        className={`${className} flex items-center justify-center sm:px-4 cursor-text text-gray-600 tracking-[-0.17px]`}
      >
        {!!label && label}
        {!!prefix && prefix}
        <input
          ref={ref}
          type={type}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          {...restProps}
        />
        {!!suffix && suffix}
      </label>
    );
  }
);

Input.displayName = "Input";

Input.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  prefix: PropTypes.node,
  suffix: PropTypes.node,
  shape: PropTypes.oneOf(["round"]),
  size: PropTypes.oneOf(["xs"]),
  variant: PropTypes.oneOf(["fill"]),
  color: PropTypes.oneOf(["gray_100"]),
};

export { Input };
