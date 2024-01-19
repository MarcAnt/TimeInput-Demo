import { useRef } from "react";
import { Format, TimeInputProps } from "./types/types";
import Icon from "./Icon/Icon";
import SetAmPm from "./SetAmPm/SetAmPm";
import ClearButton from "./controls/ClearButton";
import Clear from "../assets/Icons/Clear";
import "./styles/styles.css";
import Controls from "./controls/Controls";
import { setFocusOnInput } from "./controls/helpers";
import useTimeInput from "./hooks/useTimeInput";

const setZero: Record<Format, boolean> = {
  ["HH:mm"]: true,
  ["HH:mm a"]: true,
  ["h:mm a"]: true,
};

const TimeInput = ({
  id,
  value,
  icon,
  format = "HH:mm",
  iconPosition = "start",
  dataTestId,
  hoursPlaceholder,
  minutesPlaceholder,
  secondsPlaceholder,
  name = "time",
  disabled,
  required,
  onChange,
  is12Hours = false,
  withControls = false,
  onIconClick,
  withClearButton = false,
  className,
  iconControlUp,
  iconControlDown,
  ariaLabel = "time",
  iconAriaLabel = "clock",
  clearAriaLabel = "clear",
  hoursAriaLabel = "hours",
  minutesAriaLabel = "minutes",
  secondsAriaLabel = "seconds",
  currentLocale,
  formatOptions,
  hasSeconds = false,
  showMeridiemControl = true,
  readOnly,
  stepMinutes,
  stepSeconds,
  stepHours,
}: TimeInputProps) => {
  const hoursRef = useRef<HTMLInputElement | null>(null);
  const minutesRef = useRef<HTMLInputElement | null>(null);
  const secondsRef = useRef<HTMLInputElement | null>(null);

  const {
    setActiveKey,
    setTimeHours,
    setTimeSeconds,
    setTimeMinutes,
    timeHours,
    timeMinutes,
    timeSeconds,
    amPm,
    setAmPm,
    onChangeMinutes,
    onChangeHours,
    onChangeSeconds,
  } = useTimeInput({
    is12Hours,
    value,
    currentLocale,
    onChange,
    format,
    formatOptions,
    hasSeconds,
    hoursRef,
    minutesRef,
    secondsRef,
    stepHours,
    stepMinutes,
    stepSeconds,
  });

  const hoursClassName = `timerContainer hourContainer
  ${hoursPlaceholder === "--" ? "hyphen" : "hh"} 
  ${timeHours === "" ? "noValue" : ""} 
  ${+timeHours > 9 && setZero[format] ? "noZero" : ""}`;

  const minutesClassName = `timerContainer minutesContainer
  ${hoursPlaceholder === "--" ? "hyphen" : "mm"}  
  ${timeMinutes === "" ? "noValue" : ""}  
  ${+timeMinutes > 9 ? "noZero" : ""}`;

  const secondsClassName = `timerContainer secondsContainer
  ${hoursPlaceholder === "--" ? "hyphen" : "ss"}  
  ${timeSeconds === "" ? "noValue" : ""}  
  ${+timeSeconds > 9 ? "noZero" : ""}`;

  return (
    <>
      <div
        className={`inputContainer ${className} ${disabled ? "disabled" : ""}`}
        data-testid={dataTestId}
        role="textbox"
      >
        {icon && iconPosition === "start" ? (
          <Icon
            icon={icon}
            onClick={() => setFocusOnInput(hoursRef)}
            onIconClick={onIconClick}
            iconAriaLabel={iconAriaLabel}
          />
        ) : null}

        <div
          className={hoursClassName}
          onClick={() => setFocusOnInput(hoursRef)}
        >
          {!is12Hours ? (
            +timeHours > 9 && setZero[format] ? null : timeHours ===
              "" ? null : (
              <span aria-label={"leading-zero-hour"}>0</span>
            )
          ) : null}
          <input
            type="hidden"
            name={name}
            aria-label={ariaLabel}
            value={`${parseInt(timeHours) <= 9 ? `0${timeHours}` : timeHours}:${
              parseInt(timeMinutes) <= 9 ? `0${timeMinutes}` : timeMinutes
            }`}
          />

          <input
            type="number"
            id={id}
            autoComplete={"off"}
            min={is12Hours ? 1 : 0}
            max={is12Hours ? 12 : 23}
            value={timeHours}
            pattern={
              is12Hours ? "^([01]?[0-9]){1,1}$" : "^(2[0-3]|[01]?[0-9]){1,1}$"
            }
            placeholder={hoursPlaceholder}
            required={required}
            onKeyDown={(e) => {
              setActiveKey(e.key);
              return ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();
            }}
            onChange={onChangeHours}
            onClick={() => setFocusOnInput(hoursRef)}
            tabIndex={1}
            disabled={disabled}
            readOnly={readOnly}
            ref={hoursRef}
            aria-label={hoursAriaLabel}
          />
        </div>

        {withControls ? (
          <Controls
            iconUp={iconControlUp}
            iconDown={iconControlDown}
            has12Hours={true}
            is12Hours={is12Hours}
            setControl={setTimeHours}
            controlName={"hours"}
            disabled={disabled || readOnly}
            stepHours={stepHours}
          />
        ) : null}

        <span className={"time-divider"}>:</span>

        <div
          className={minutesClassName}
          onClick={() => setFocusOnInput(minutesRef)}
        >
          {+timeMinutes <= 9 ? (
            timeMinutes === "" ? null : (
              <span aria-label={"leading-zero-minutes"}>0</span>
            )
          ) : null}
          <input
            type="number"
            autoComplete={"off"}
            minLength={1}
            min={0}
            maxLength={2}
            size={2}
            max={59}
            placeholder={minutesPlaceholder}
            value={timeMinutes}
            inputMode={"numeric"}
            pattern={"/^([0-5]){1,1}([0-9]){1,1}$/"}
            required={required}
            readOnly={readOnly}
            onKeyDown={(e) => {
              setActiveKey(e.key);
              return ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();
            }}
            onChange={onChangeMinutes}
            onClick={() => {
              setFocusOnInput(minutesRef);
            }}
            tabIndex={2}
            disabled={disabled}
            ref={minutesRef}
            aria-label={minutesAriaLabel}
          />
        </div>

        {withControls ? (
          <Controls
            iconUp={iconControlUp}
            iconDown={iconControlDown}
            has12Hours={false}
            setControl={setTimeMinutes}
            controlName="minutes"
            disabled={disabled || readOnly}
            stepMinutes={stepMinutes}
          />
        ) : null}

        {hasSeconds ? (
          <>
            <span className={"time-divider"}>:</span>

            <div
              className={secondsClassName}
              onClick={() => setFocusOnInput(secondsRef)}
            >
              {+timeSeconds <= 9 ? (
                timeSeconds === "" ? null : (
                  <span aria-label={"leading-zero-seconds"}>0</span>
                )
              ) : null}
              <input
                type="number"
                autoComplete={"off"}
                minLength={1}
                min={0}
                maxLength={2}
                size={2}
                max={59}
                placeholder={secondsPlaceholder}
                value={timeSeconds}
                inputMode={"numeric"}
                pattern={"/^([0-5]){1,1}([0-9]){1,1}$/"}
                required={required}
                onKeyDown={(e) => {
                  setActiveKey(e.key);
                  return (
                    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
                  );
                }}
                onChange={onChangeSeconds}
                onClick={() => setFocusOnInput(secondsRef)}
                tabIndex={2}
                disabled={disabled}
                readOnly={readOnly}
                ref={secondsRef}
                aria-label={secondsAriaLabel}
              />
            </div>
            {withControls ? (
              <Controls
                iconUp={iconControlUp}
                iconDown={iconControlDown}
                setControl={setTimeSeconds}
                has12Hours={false}
                controlName="seconds"
                disabled={disabled || readOnly}
                stepSeconds={stepSeconds}
              />
            ) : null}
          </>
        ) : null}

        {icon && iconPosition === "end" ? (
          <Icon
            icon={icon}
            onClick={() => hoursRef.current?.focus()}
            onIconClick={onIconClick}
            iconAriaLabel={iconAriaLabel}
          />
        ) : null}

        {is12Hours && showMeridiemControl ? (
          <SetAmPm
            meridiemAriaLabel={"meridiam-controls"}
            amPm={amPm}
            setAmPm={setAmPm}
            disabled={disabled || readOnly}
          />
        ) : null}

        {withClearButton ? (
          <ClearButton
            clearIcon={<Clear />}
            className={"clearButton"}
            clearAriaLabel={clearAriaLabel}
            disabled={disabled || readOnly}
            onClear={() => {
              setTimeHours("0");
              setTimeMinutes("0");
              setTimeSeconds("0");
            }}
          />
        ) : null}
      </div>
    </>
  );
};

export default TimeInput;
