import React, { ReactNode, memo } from "react";
import { TimeInputProps } from "../types/types";
import DownArrow from "../../assets/downArrow.svg";
import UpArrow from "../../assets/upArrow.svg";
import {
  addHours,
  addMinutes,
  addSeconds,
  removeHours,
  removeMinutes,
  removeSeconds,
} from "./helpers";

type ControlProps = {
  setControl: (value: React.SetStateAction<string>) => void;
  has12Hours: false;
  iconUp?: ReactNode;
  iconDown?: ReactNode;
  controlName: "hours" | "minutes" | "seconds";
  disabled?: boolean;
  stepMinutes?: number;
  stepHours?: number;
  stepSeconds?: number;
};

type ControlHoursProps = {
  setControl: (value: React.SetStateAction<string>) => void;
  is12Hours: TimeInputProps["is12Hours"];
  has12Hours: true;
  iconUp?: ReactNode;
  iconDown?: ReactNode;
  controlName: "hours" | "minutes" | "seconds";
  disabled?: boolean;
  stepHours?: number;
  stepMinutes?: number;
  stepSeconds?: number;
};

type Props = ControlProps | ControlHoursProps;

const Controls = memo((props: Props) => {
  const { has12Hours, disabled, stepMinutes, stepSeconds, stepHours } = props;

  return (
    <div
      className={"arrowsContainer"}
      aria-label={`${props.controlName}-controls`}
    >
      <button
        onClick={(e) => {
          e.preventDefault();
          props.controlName === "minutes"
            ? props.setControl((prev) => addMinutes(prev, stepMinutes))
            : props.controlName === "seconds"
            ? props.setControl((prev) => addSeconds(prev, stepSeconds))
            : props.controlName === "hours" && has12Hours
            ? props.setControl((prev) =>
                addHours(prev, props.is12Hours, stepHours)
              )
            : null;
        }}
        disabled={disabled}
      >
        {props.iconUp ? (
          props.iconUp
        ) : (
          <img src={UpArrow} alt={`add ${props.controlName}`} />
        )}
      </button>
      <button
        disabled={disabled}
        onClick={(e) => {
          e.preventDefault();

          props.controlName === "minutes"
            ? props.setControl((prev) => removeMinutes(prev, stepMinutes))
            : props.controlName === "seconds"
            ? props.setControl((prev) => removeSeconds(prev, stepSeconds))
            : props.controlName === "hours" && has12Hours
            ? props.setControl((prev) =>
                removeHours(prev, props.is12Hours, stepHours)
              )
            : null;
        }}
      >
        {props.iconDown ? (
          props.iconDown
        ) : (
          <img src={DownArrow} alt={"remove hour"} />
        )}
      </button>
    </div>
  );
});

export default Controls;
