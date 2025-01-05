// src/components/about-components/SeekBar/index.jsx

"use client";
import React from "react";
import { Range, getTrackBackground } from "react-range";

const MIN = 0;
const MAX = 100;

const SeekBar = ({
  min = MIN,
  max = MAX,
  inputValue = [0], // Default to array with single value
  className = "",
  trackClassName = "",
  thumbClassName = "",
  thumbChildren = "",
  trackColors = ["#548BF4", "#ccc"], // Default colors
  trackBackground = {},
  ...otherProps
}) => {
  const [values, setValues] = React.useState(
    Array.isArray(inputValue) ? inputValue : [inputValue]
  );

  React.useEffect(() => {
    setValues(Array.isArray(inputValue) ? inputValue : [inputValue]);
  }, [inputValue]);

  const renderSeekBarThumb = ({ props, isDragged }) => {
    return (
      <div
        {...props}
        className={`${thumbClassName} h-4 w-4 rounded-full bg-white shadow`}
      >
        {thumbChildren}
      </div>
    );
  };

  const renderSeekBarTrack = ({ props, children }) => {
    return (
      <div
        className={`${className} h-2 w-full`}
        style={{
          ...props.style,
        }}
      >
        <div
          ref={props.ref}
          className={`${trackClassName} h-full w-full rounded-full`}
          style={{
            background: getTrackBackground({
              values: values,
              colors: trackColors,
              min,
              max,
              ...trackBackground,
            }),
            alignSelf: "center",
          }}
        >
          {children}
        </div>
      </div>
    );
  };

  return (
    <Range
      values={values}
      min={min}
      max={max}
      onChange={(newValues) => setValues(newValues)}
      renderTrack={renderSeekBarTrack}
      renderThumb={renderSeekBarThumb}
      {...otherProps}
    />
  );
};

export { SeekBar };
