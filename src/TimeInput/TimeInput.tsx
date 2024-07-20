/// <reference types="vite-plugin-svgr/client" />
import { setFocusOnInput } from "./Controls/Helpers";
import UseTimeInput from "./Hooks/UseTimeInput";
import Controls from "./Controls/Controls";
import { TimeInputProps } from "./Types/types";
import Clock from "../assets/Clock.svg?react";
import styles from "./Styles/styles.module.scss";

/**
 * TimeInput component provides a time input field to control hours and minutes.
 * Display time in 24 hours or 12 hours format. Can be handle with keyboard (arrow up or down)
 *
 * @param {TimeInputProps} props - Props for the TimeInput component.
 * @returns {JSX.Element}
 */

const TimeInput = ({
  id,
  value,
  dataTestId,
  hoursPlaceholder = "--",
  minutesPlaceholder = "--",
  secondsPlaceholder = "--",
  name = "time",
  disabled,
  required,
  onChange,
  className,
  ariaLabel = "time",
  iconAriaLabel = "clock",
  hoursAriaLabel = "hours",
  minutesAriaLabel = "minutes",
  secondsAriaLabel = "seconds",
  currentLocale,
  hasSeconds = false,
}: TimeInputProps): JSX.Element => {
  const {
    hoursRef,
    minutesRef,
    secondsRef,
    setInputType,
    inputType,
    updateTime,
    handleHours,
    handleMinutes,
    handleSeconds,
    hours,
    minutes,
    seconds,
    setSeconds,
    setHours,
    setMinutes,
  } = UseTimeInput({
    value,
    currentLocale,
    onChange,
    hasSeconds,
  });

  const hoursClassName = `${styles.timerContainer} ${styles.hourContainer}
  ${hoursPlaceholder === "--" ? styles.hyphen : styles.hh} 
  ${hours === "" ? styles.noValue : ""} 
  ${+hours > 9 ? styles.noZero : ""}`;

  const minutesClassName = `${styles.timerContainer} ${
    styles.minutesContainer
  } ${hasSeconds ? styles.withSeconds : ""}
  ${minutesPlaceholder === "--" ? styles.hyphen : styles.mm}  
  ${minutes === "" ? styles.noValue : ""}  
  ${+minutes > 9 ? styles.noZero : ""}`;

  const secondsClassName = `${styles.timerContainer} ${styles.secondsContainer}`;

  return (
    <div
      className={`${styles.inputContainer} ${className || ""} ${
        disabled ? styles.disabled : ""
      }`}
      data-testid={dataTestId}
      role="textbox"
      tabIndex={0}
    >
      <div
        className={styles.iconContainer}
        role="button"
        onClick={() => {
          setInputType("hours");
          setFocusOnInput(hoursRef);
        }}
        aria-label={iconAriaLabel}
      >
        <Clock />
      </div>
      <div className={styles.timeInputMainContainer}>
        <div
          className={hoursClassName}
          onClick={(e) => {
            e.preventDefault();
            setInputType("hours");
            setFocusOnInput(hoursRef);
          }}
        >
          <input
            type="hidden"
            name={name}
            aria-label={ariaLabel}
            value={
              hasSeconds
                ? `${hours}:${minutes}:${seconds}`
                : `${hours}:${minutes}`
            }
          />

          <input
            type="number"
            id={id}
            autoComplete={"off"}
            minLength={1}
            maxLength={2}
            step={1}
            min={0}
            max={23}
            inputMode="numeric"
            value={hours}
            onChange={handleHours}
            pattern={"^(2[0-3]|[01]?[0-9]){1,1}$"}
            placeholder={hoursPlaceholder}
            required={required}
            onBlur={() => {
              if (hours === "") {
                updateTime("00", minutes, seconds);
                return;
              }
              if (hours.length < 2) {
                updateTime(`0${hours}`, minutes, seconds);
                return;
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Tab") {
                setInputType("minutes");
                if (hours === "") {
                  updateTime("00", minutes, seconds);
                  return;
                }
                if (hours.length < 2) {
                  updateTime(`0${hours}`, minutes, seconds);
                  return;
                }
              }

              return ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();
            }}
            onClick={(e) => {
              e.preventDefault();
              setFocusOnInput(hoursRef);
              setInputType("hours");
            }}
            tabIndex={0}
            disabled={disabled}
            aria-label={hoursAriaLabel}
            name={`hours-${name}`}
            ref={hoursRef}
          />
        </div>

        <span className={styles.timeDivider}>:</span>

        <div
          className={minutesClassName}
          onClick={() => {
            setInputType("minutes");
            setFocusOnInput(minutesRef);
          }}
        >
          <input
            type="number"
            autoComplete={"off"}
            min={0}
            max={59}
            step={1}
            size={2}
            placeholder={minutesPlaceholder}
            value={minutes}
            inputMode={"numeric"}
            onChange={handleMinutes}
            pattern={"/^([0-5]){1,1}([0-9]){1,1}$/"}
            required={required}
            onBlur={() => {
              if (minutes === "") {
                updateTime(hours, "00", seconds);
                return;
              }
              if (minutes.length < 2) {
                updateTime(hours, `0${minutes}`, seconds);
                return;
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Tab" && hasSeconds) {
                if (minutes === "") {
                  updateTime(hours, "00", seconds);
                  return;
                }
                if (minutes.length < 2) {
                  updateTime(hours, `0${minutes}`, seconds);
                  return;
                }
                setInputType("seconds");
              }

              return ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();
            }}
            onClick={(e) => {
              e.preventDefault();
              setFocusOnInput(minutesRef);
              setInputType("minutes");
            }}
            ref={minutesRef}
            tabIndex={0}
            disabled={disabled}
            aria-label={minutesAriaLabel}
            name={`minutes-${name}`}
          />
        </div>

        {hasSeconds ? (
          <>
            <span className={styles.timeDivider}>:</span>

            <div
              className={secondsClassName}
              onClick={() => {
                setInputType("seconds");
                setFocusOnInput(secondsRef);
              }}
            >
              <input
                type="number"
                autoComplete={"off"}
                step={1}
                size={2}
                min={0}
                max={59}
                placeholder={secondsPlaceholder}
                value={seconds}
                pattern={"/^([0-5]){1,1}([0-9]){1,1}$/"}
                required={required}
                onBlur={() => {
                  if (seconds === "") {
                    updateTime(hours, minutes, "00");
                    return;
                  }
                  if (seconds.length < 2) {
                    updateTime(hours, minutes, `0${seconds}`);
                    return;
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Tab") {
                    if (seconds === "") {
                      updateTime(hours, minutes, "00");
                      return;
                    }
                    if (seconds.length < 2) {
                      updateTime(hours, minutes, `0${seconds}`);
                      return;
                    }
                    setInputType("seconds");
                  }

                  return (
                    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
                  );
                }}
                onChange={handleSeconds}
                onClick={(e) => {
                  e.preventDefault();
                  setFocusOnInput(secondsRef);
                  setInputType("seconds");
                }}
                tabIndex={0}
                disabled={disabled}
                ref={secondsRef}
                aria-label={secondsAriaLabel}
                name={`seconds-${name}`}
              />
            </div>
          </>
        ) : null}
      </div>
      <Controls
        inputType={inputType}
        setSeconds={setSeconds}
        setMinutes={setMinutes}
        setHours={setHours}
        seconds={seconds}
        minutes={minutes}
        hours={hours}
        disabled={disabled}
        updateTime={updateTime}
      />
    </div>
  );
};

export default TimeInput;
