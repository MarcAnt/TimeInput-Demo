import React, { memo } from "react";
import ChevronUp from "../../assets/upArrow.svg?react";
import ChevronDown from "../../assets/downArrow.svg?react";
// import {
//   addHours,
//   addMinutes,
//   addSeconds,
//   removeHours,
//   removeMinutes,
//   removeSeconds,
// } from "./Helpers";
import styles from "../Styles/styles.module.scss";
import UseControls from "./Hooks/UseControls";

export type ControlProps = {
  inputType: "hours" | "minutes" | "seconds";
  disabled: boolean | undefined;
  updateTime: (hour: string, minute: string, seconds: string) => void;
  hours: string;
  minutes: string;
  seconds: string;
  setHours: (value: React.SetStateAction<string>) => void;
  setMinutes: (value: React.SetStateAction<string>) => void;
  setSeconds: (value: React.SetStateAction<string>) => void;
};

const Controls = memo(function Controls(props: ControlProps) {
  const {
    disabled,
    // inputType,
    // updateTime,
    // setHours,
    // setMinutes,
    // setSeconds,
    // hours,
    // minutes,
    // seconds,
  } = props;

  // const handleAddTime = (
  //   e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  // ) => {
  //   e.preventDefault();

  //   if (inputType === "hours") {
  //     setHours((prev) => addHours(prev));
  //     const newHours = +hours + 1;
  //     const transformed = `${
  //       newHours < 10 ? `0${newHours}` : newHours < 24 ? newHours : 23
  //     }`;
  //     updateTime(transformed, minutes, seconds);
  //   }

  //   if (inputType === "minutes") {
  //     setMinutes((prev) => addMinutes(prev));
  //     const newMinutes = +minutes + 1;
  //     const transformed = `${
  //       newMinutes < 10 ? `0${newMinutes}` : newMinutes < 60 ? newMinutes : 59
  //     }`;
  //     updateTime(hours, transformed, seconds);
  //   }

  //   if (inputType === "seconds") {
  //     setSeconds((prev) => addSeconds(prev));

  //     const newSeconds = +seconds + 1;
  //     const transformed = `${
  //       newSeconds < 10 ? `0${newSeconds}` : newSeconds < 60 ? newSeconds : 59
  //     }`;
  //     updateTime(hours, minutes, transformed);
  //   }
  // };

  // const handleRemoveTime = (
  //   e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  // ) => {
  //   e.preventDefault();

  //   if (inputType === "hours") {
  //     setHours((prev) => removeHours(prev));

  //     const newHours = +hours - 1;
  //     const transformed = `${
  //       newHours < 0 ? "00" : newHours < 10 ? `0${newHours}` : newHours
  //     }`;
  //     updateTime(transformed, minutes, seconds);
  //   }

  //   if (inputType === "minutes") {
  //     setMinutes((prev) => removeMinutes(prev));

  //     const newMinutes = +minutes - 1;
  //     const transformed = `${
  //       newMinutes < 0 ? "00" : newMinutes < 10 ? `0${newMinutes}` : newMinutes
  //     }`;
  //     updateTime(hours, transformed, seconds);
  //   }

  //   if (inputType === "seconds") {
  //     setSeconds((prev) => removeSeconds(prev));

  //     const newSeconds = +seconds - 1;
  //     const transformed = `${
  //       newSeconds < 0 ? "00" : newSeconds < 10 ? `0${newSeconds}` : newSeconds
  //     }`;
  //     updateTime(hours, minutes, transformed);
  //   }
  // };

  const { handleAddTime, handleRemoveTime } = UseControls(props);

  return (
    <div
      className={styles.arrowsContainer}
      aria-label={`${props.inputType}-controls`}
    >
      <button onClick={(e) => handleAddTime(e)} disabled={disabled}>
        <ChevronUp />
      </button>
      <button disabled={disabled} onClick={(e) => handleRemoveTime(e)}>
        <ChevronDown />
      </button>
    </div>
  );
});

export default Controls;
