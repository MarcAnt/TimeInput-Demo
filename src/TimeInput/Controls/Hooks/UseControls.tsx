import { ControlProps } from "../Controls";
import {
  addHours,
  addMinutes,
  addSeconds,
  removeHours,
  removeMinutes,
  removeSeconds,
} from "../Helpers";

const UseControls = (props: ControlProps) => {
  const {
    inputType,
    updateTime,
    setHours,
    setMinutes,
    setSeconds,
    hours,
    minutes,
    seconds,
  } = props;

  const handleAddTime = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (inputType === "hours") {
      setHours((prev) => addHours(prev));
      const newHours = +hours + 1;
      const transformed = `${
        newHours < 10 ? `0${newHours}` : newHours < 24 ? newHours : 23
      }`;
      updateTime(transformed, minutes, seconds);
    }

    if (inputType === "minutes") {
      setMinutes((prev) => addMinutes(prev));
      const newMinutes = +minutes + 1;
      const transformed = `${
        newMinutes < 10 ? `0${newMinutes}` : newMinutes < 60 ? newMinutes : 59
      }`;
      updateTime(hours, transformed, seconds);
    }

    if (inputType === "seconds") {
      setSeconds((prev) => addSeconds(prev));

      const newSeconds = +seconds + 1;
      const transformed = `${
        newSeconds < 10 ? `0${newSeconds}` : newSeconds < 60 ? newSeconds : 59
      }`;
      updateTime(hours, minutes, transformed);
    }
  };

  const handleRemoveTime = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (inputType === "hours") {
      setHours((prev) => removeHours(prev));

      const newHours = +hours - 1;
      const transformed = `${
        newHours < 0 ? "00" : newHours < 10 ? `0${newHours}` : newHours
      }`;
      updateTime(transformed, minutes, seconds);
    }

    if (inputType === "minutes") {
      setMinutes((prev) => removeMinutes(prev));

      const newMinutes = +minutes - 1;
      const transformed = `${
        newMinutes < 0 ? "00" : newMinutes < 10 ? `0${newMinutes}` : newMinutes
      }`;
      updateTime(hours, transformed, seconds);
    }

    if (inputType === "seconds") {
      setSeconds((prev) => removeSeconds(prev));

      const newSeconds = +seconds - 1;
      const transformed = `${
        newSeconds < 0 ? "00" : newSeconds < 10 ? `0${newSeconds}` : newSeconds
      }`;
      updateTime(hours, minutes, transformed);
    }
  };

  return { handleAddTime, handleRemoveTime };
};

export default UseControls;
