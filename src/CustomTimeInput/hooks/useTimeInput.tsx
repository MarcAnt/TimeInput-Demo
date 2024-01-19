import { useEffect, useState } from "react";
import { TimeInputProps } from "../types/types";
import { TwelveHoursRegex, TwientyFourHoursRegex } from "../utils";
import {
  addHours,
  addMinutes,
  addSeconds,
  removeHours,
  removeMinutes,
  removeSeconds,
  setFocusOnInput,
} from "../controls/helpers";

type Props = {
  is12Hours: TimeInputProps["is12Hours"];
  value: TimeInputProps["value"];
  currentLocale: TimeInputProps["currentLocale"];
  onChange: TimeInputProps["onChange"];
  format: TimeInputProps["format"];
  formatOptions: TimeInputProps["formatOptions"];
  stepMinutes: TimeInputProps["stepMinutes"];
  stepSeconds: TimeInputProps["stepSeconds"];
  stepHours: TimeInputProps["stepHours"];
  hasSeconds: TimeInputProps["hasSeconds"];
  hoursRef: React.MutableRefObject<HTMLInputElement | null>;
  minutesRef: React.MutableRefObject<HTMLInputElement | null>;
  secondsRef: React.MutableRefObject<HTMLInputElement | null>;
};

const useTimeInput = ({
  is12Hours,
  value,
  currentLocale,
  onChange,
  format,
  formatOptions,
  stepMinutes,
  stepHours,
  stepSeconds,
  hasSeconds,
  minutesRef,
  secondsRef,
}: Props) => {
  const [activeKey, setActiveKey] = useState<null | string>(null);

  const [time, setTime] = useState<Date | string>(
    value !== "" ? value : "0" || new Date(value)
  );

  const [amPm, setAmPm] = useState<"AM" | "PM">("AM");

  const [timeHours, setTimeHours] = useState(() => {
    if (!isNaN(new Date(time).getTime())) {
      if (is12Hours) {
        const hours = new Date(time).getHours();
        if (hours === 12) {
          setAmPm("PM");
        }

        const timeIn12Hours = hours - 12;
        return String(timeIn12Hours);
      }
      return new Date(time).getHours().toString();
    }

    if (time instanceof Date) {
      if (is12Hours) {
        const timeIn12Hours = time.getHours() - 12;
        return String(timeIn12Hours);
      }
      return time.getHours().toString();
    }

    if (
      typeof time === "string" &&
      TwelveHoursRegex.test(time) &&
      TwientyFourHoursRegex.test(time)
    ) {
      const hour = time.split(":")[0];
      return parseInt(hour).toString();
    }

    return "0";
  });

  const [timeMinutes, setTimeMinutes] = useState(() => {
    if (!isNaN(new Date(time).getTime())) {
      return new Date(time).getMinutes().toString();
    }

    if (time instanceof Date) {
      return time.getMinutes().toString();
    }

    if (
      typeof time === "string" &&
      TwelveHoursRegex.test(time) &&
      TwientyFourHoursRegex.test(time)
    ) {
      const minutes = time.split(":")[1];
      return parseInt(minutes).toString();
    }

    return "0";
  });

  const [timeSeconds, setTimeSeconds] = useState(() => {
    if (!isNaN(new Date(time).getTime())) {
      return new Date(time).getSeconds().toString();
    }

    if (time instanceof Date) {
      return time.getSeconds().toString();
    }

    if (
      typeof time === "string" &&
      TwelveHoursRegex.test(time) &&
      TwientyFourHoursRegex.test(time)
    ) {
      const seconds = time.split(":")[2];

      if (seconds === undefined) {
        return "0";
      }

      return parseInt(seconds).toString();
    }

    return "0";
  });

  useEffect(() => {
    const currentTime = new Date();
    currentTime.setHours(timeHours === "" ? 0 : +timeHours);

    if (amPm === "PM" && is12Hours) {
      if (timeHours !== "12") {
        currentTime.setHours(+timeHours + 12);
      }
    }

    if (timeHours === "12" && amPm === "PM" && is12Hours) {
      currentTime.setHours(+timeHours);
    }

    if (timeHours === "12" && amPm === "AM" && is12Hours) {
      currentTime.setHours(+timeHours - 12);
    }

    currentTime.setMinutes(+timeMinutes);
    currentTime.setSeconds(+timeSeconds);
    setTime(currentTime);
  }, [timeMinutes, timeHours, amPm, is12Hours, timeSeconds]);

  useEffect(() => {
    const setTimeValue =
      time instanceof Date
        ? time.toLocaleTimeString(currentLocale, {
            hour12:
              (is12Hours && format === "h:mm a") ||
              (is12Hours && format === "HH:mm a"),
            formatMatcher: "best fit",
            ...formatOptions,
          })
        : time;
    if (onChange) onChange(setTimeValue);
  }, [time, is12Hours, format, onChange, currentLocale, formatOptions]);

  const onChangeMinutes = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;

    if (value === "") {
      setTimeMinutes(value);
      return;
    }

    if (activeKey === null || !isNaN(parseInt(activeKey))) {
      if (value.length <= 2) {
        if (+value >= 0 && +value <= 59) {
          setTimeMinutes(value);
        }
        if (+value >= 19 && hasSeconds) {
          setFocusOnInput(secondsRef);
        }
      }
    } else {
      if (activeKey === "ArrowUp") {
        setTimeMinutes((prev) => {
          return addMinutes(prev, stepMinutes);
        });
      }

      if (activeKey === "ArrowDown") {
        setTimeMinutes((prev) => removeMinutes(prev, stepMinutes));
      }
    }
  };

  const onChangeHours = (e: React.ChangeEvent<HTMLInputElement>) => {
    const changeTimeFormat = is12Hours ? 12 : 24;
    const value = e.currentTarget.value;

    if (activeKey === null || !isNaN(parseInt(activeKey))) {
      const lastNumber = value.split("").at(-1);

      if (value.length <= 2) {
        setTimeHours(
          Number(lastNumber) > changeTimeFormat
            ? changeTimeFormat === 12
              ? "1"
              : "0"
            : lastNumber || "0"
        );

        if (lastNumber && +lastNumber >= 2) {
          setFocusOnInput(minutesRef);
        }
      }
      if (value.length > 2) {
        const lastNumbers = value.split("").slice(0, 2).join("");

        setTimeHours(
          Number(lastNumbers) > changeTimeFormat
            ? changeTimeFormat === 12
              ? "1"
              : "0"
            : lastNumbers || "0"
        );

        if (+lastNumbers && +lastNumbers >= 2) {
          setFocusOnInput(minutesRef);
        }
        return;
      }

      setTimeHours(value);
    } else {
      setActiveKey(null);
      const value = e.currentTarget.value;

      if (activeKey === "ArrowUp") {
        setTimeHours((prev) => {
          return addHours(
            Number(prev) >= Number(value) ? value : prev,
            is12Hours,
            stepHours
          );
        });
        return;
      }
      if (activeKey === "ArrowDown") {
        setTimeHours((prev) => removeHours(prev, is12Hours, stepHours));
      }

      setTimeHours(value);
    }
  };

  const onChangeSeconds = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (activeKey === null || !isNaN(parseInt(activeKey))) {
      const value = e.currentTarget.value;

      if (value.length <= 2) {
        if (+value >= 0 && +value <= 59) {
          setTimeSeconds(value);
        }
      }
    } else {
      if (activeKey === "ArrowUp") {
        setTimeSeconds((prev) => {
          return addSeconds(prev, stepSeconds);
        });
      }
      if (activeKey === "ArrowDown") {
        setTimeSeconds((prev) => {
          return removeSeconds(prev, stepSeconds);
        });
      }
    }
  };

  return {
    activeKey,
    setActiveKey,
    time,
    setTime,
    setTimeSeconds,
    timeSeconds,
    setTimeHours,
    timeHours,
    setTimeMinutes,
    timeMinutes,
    amPm,
    setAmPm,
    onChangeMinutes,
    onChangeHours,
    onChangeSeconds,
  };
};

export default useTimeInput;
