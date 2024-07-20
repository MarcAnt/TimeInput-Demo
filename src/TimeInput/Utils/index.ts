export const TwentyFourHoursRegex = new RegExp(
  /^(2[0-3]|[01]?[0-9]):([0-5][0-9])(:[0-5][0-9])?$/
);

export const formatHoursValue = (value: string | Date | undefined) => {
  if (!value) return "00";

  if (!isNaN(new Date(value).getTime())) {
    const hours = new Date(value).getHours();
    return hours < 10 ? `0${hours}` : hours.toString();
  }

  if (value instanceof Date) {
    const hours = new Date(value).getHours();
    return hours < 10 ? `0${hours}` : hours.toString();
  }

  if (typeof value === "string" && value.includes(":")) {
    const hour = value.split(":")[0];
    if (hour === undefined) {
      return "00";
    }
    return hour.length < 2 ? `0${hour}` : hour;
  }

  return "00";
};

export const formatMinutesValue = (value: string | Date | undefined) => {
  if (!value) return "00";
  if (!isNaN(new Date(value).getTime())) {
    const minutes = new Date(value).getMinutes();
    return minutes < 10 ? `0${minutes}` : minutes.toString();
  }

  if (value instanceof Date) {
    return value.getMinutes().toString();
  }

  if (typeof value === "string" && value.includes(":")) {
    const minutes = value.split(":")[1];

    if (minutes === undefined) {
      return "00";
    }
    return minutes.length < 2 ? `0${minutes}` : minutes;
  }

  return "00";
};

export const formatSecondsValue = (value: string | Date | undefined) => {
  if (!value) return "00";
  if (!isNaN(new Date(value).getTime())) {
    const seconds = new Date(value).getSeconds();
    return seconds < 10 ? `0${seconds}` : seconds.toString();
  }

  if (value instanceof Date) {
    return value.getSeconds().toString();
  }

  if (typeof value === "string" && value.includes(":")) {
    const seconds = value.split(":")[2];

    if (seconds === undefined) {
      return "00";
    }
    return seconds.length < 2 ? `0${seconds}` : seconds;
  }

  return "00";
};
