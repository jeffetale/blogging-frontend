// src/components/about-components/Heading/index.js

import React from "react";

const Heading = ({
  children,
  className = "",
  as,
  ...restProps
}) => {
  const Component = as || "h6";

  return (
    <Component className={`${className}`} {...restProps}>
      {children}
    </Component>
  );
};

export { Heading };