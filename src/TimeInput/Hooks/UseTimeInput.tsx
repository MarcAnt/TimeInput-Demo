import { useCallback, useRef, useState } from "react";
import { TimeInputProps } from "../Types/types";
import {
  formatHoursValue,
  formatMinutesValue,
  formatSecondsValue,
} from "../Utils";

type Props = {
  value?: TimeInputProps["value"];
  currentLocale?: TimeInputProps["currentLocale"];
  onChange?: TimeInputProps["onChange"];
  hasSeconds: TimeInputProps["hasSeconds"];
};

const UseTimeInput = ({ value, onChange, hasSeconds }: Props) => {
  const [hours, setHours] = useState(formatHoursValue(value));
  const [minutes, setMinutes] = useState(formatMinutesValue(value));
  const [seconds, setSeconds] = useState(formatSecondsValue(value));

  const [inputType, setInputType] = useState<"hours" | "minutes" | "seconds">(
    "hours"
  );

  const hoursRef = useRef<HTMLInputElement | null>(null);
  const minutesRef = useRef<HTMLInputElement | null>(null);
  const secondsRef = useRef<HTMLInputElement | null>(null);

  const fullCurrentTime = `${hours}:${minutes}:${seconds}`;
  const fullTimeValues = `${formatHoursValue(value)}:${formatMinutesValue(
    value
  )}:${formatSecondsValue(value)}`;

  if (value && onChange) {
    if (fullTimeValues !== fullCurrentTime) {
      setHours(formatHoursValue(value));
      setMinutes(formatMinutesValue(value));
      setSeconds(formatSecondsValue(value));
    }
  }

  const updateTime = useCallback(
    (hoursVal: string, minutesVal: string, secondsVal: string) => {
      if (onChange && value) {
        const newTime = hasSeconds
          ? `${hoursVal}:${minutesVal}:${secondsVal}`
          : `${hoursVal}:${minutesVal}`;
        onChange(newTime);
        return;
      } else {
        setHours(hoursVal);
        setMinutes(minutesVal);
        setSeconds(secondsVal);
      }
    },
    [onChange, value, hasSeconds]
  );

  const handleHours = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { currentTarget } = e;

    if (currentTarget.value === "") {
      updateTime(currentTarget.value, minutes, seconds);
      return;
    }

    if (
      currentTarget.value &&
      currentTarget.valueAsNumber < 24 &&
      currentTarget.valueAsNumber >= 0
    ) {
      const lastNumbers = currentTarget.value.slice(-2);

      if (onChange) {
        updateTime(
          lastNumbers.length < 2 ? `0${lastNumbers}` : lastNumbers,
          minutes,
          seconds
        );
      } else {
        setHours(lastNumbers.length < 2 ? `0${lastNumbers}` : lastNumbers);
      }
    }
  };

  const handleMinutes = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { currentTarget } = e;

    if (currentTarget.value === "") {
      updateTime(hours, currentTarget.value, seconds);
      return;
    }

    if (
      currentTarget.value &&
      currentTarget.valueAsNumber < 60 &&
      currentTarget.valueAsNumber >= 0
    ) {
      const lastNumbers = currentTarget.value.slice(-2);

      if (onChange) {
        updateTime(
          hours,
          lastNumbers.length < 2 ? `0${lastNumbers}` : lastNumbers,
          seconds
        );
      } else {
        setMinutes(lastNumbers.length < 2 ? `0${lastNumbers}` : lastNumbers);
      }
    }
  };

  const handleSeconds = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { currentTarget } = e;

    if (currentTarget.value === "") {
      updateTime(hours, minutes, currentTarget.value);
      return;
    }

    if (
      currentTarget.value &&
      currentTarget.valueAsNumber < 60 &&
      currentTarget.valueAsNumber >= 0
    ) {
      const lastNumbers = currentTarget.value.slice(-2);

      if (onChange) {
        updateTime(
          hours,
          minutes,
          lastNumbers.length < 2 ? `0${lastNumbers}` : lastNumbers
        );
      } else {
        setSeconds(lastNumbers.length < 2 ? `0${lastNumbers}` : lastNumbers);
      }
    }
  };

  return {
    hoursRef,
    minutesRef,
    secondsRef,
    handleHours,
    handleMinutes,
    handleSeconds,
    setInputType,
    inputType,
    updateTime,
    hours,
    minutes,
    seconds,
    setHours,
    setMinutes,
    setSeconds,
  };
};

export default UseTimeInput;
