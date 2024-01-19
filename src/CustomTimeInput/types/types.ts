import { ReactNode } from "react";

//maxTime, maxHours, maxMinutes, minHours, minTime, minMinutes, stepHours, stepMinutes

export type Format = "HH:mm" | "HH:mm a" | "h:mm a";

export type TimeInputProps = {
  onChange: (value: Date | string) => void;
  value: Date | string;
  is12Hours?: boolean;
  format?: Format;
  formatOptions?: Intl.DateTimeFormatOptions;
  currentLocale?: Intl.LocalesArgument;
  icon?: ReactNode;
  iconPosition?: "start" | "end";
  onIconClick?: () => void;
  iconControlUp?: ReactNode;
  iconControlDown?: ReactNode;
  withControls?: boolean;
  name?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  dataTestId?: string;
  hoursPlaceholder?: "--" | "HH" | "hh";
  minutesPlaceholder?: "--" | "mm";
  secondsPlaceholder?: "--" | "ss";
  withClearButton?: boolean;
  clearIcon?: ReactNode | null;
  iconAriaLabel?: string;
  clearAriaLabel?: string;
  secondsAriaLabel?: string;
  minutesAriaLabel?: string;
  hoursAriaLabel?: string;
  meridiemAriaLabel?: string;
  ariaLabel?: string;
  hasSeconds?: boolean;
  showMeridiemControl?: boolean;
  id?: HTMLInputElement["id"];
  readOnly?: HTMLInputElement["readOnly"];
  stepMinutes?: number;
  stepSeconds?: number;
  stepHours?: number;
};

export type AMPMProps = {
  amPm: "AM" | "PM";
  setAmPm: React.Dispatch<React.SetStateAction<"AM" | "PM">>;
  meridiemAriaLabel?: string;
  onClickMeridiem?: (value: "AM" | "PM") => "AM" | "PM";
  disabled?: boolean;
};
