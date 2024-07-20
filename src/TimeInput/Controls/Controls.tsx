import React, { memo } from "react";
import ChevronUp from "../../assets/upArrow.svg?react";
import ChevronDown from "../../assets/downArrow.svg?react";
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
  const { disabled } = props;

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
