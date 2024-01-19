export const getTime = (time: string | Date | undefined) => {
  const matchISODate = new RegExp(
    "^(d{4})-(d{2})-(d{2})T(d{2}):(d{2}):(d{2})(.d+)?(Z|[-+]d{2}:d{2}:d{2})?$"
  );

  if (typeof time === "string" && matchISODate.test(time) && new Date(time)) {
    const [hours, minutes, seconds] = time.split(":");
    return {
      hours: hours || "0",
      minutes: minutes || "0",
      seconds: seconds || "0",
    };
  }

  if (time instanceof Date) {
    const minutes = time.getMinutes().toString() || "0";
    const hours = time.getHours().toString() || "0";
    const seconds = time.getSeconds().toString() || "0";
    return { hours, minutes, seconds };
  }

  if (typeof time === "string") {
    const [hours, minutes, seconds] = time.split(":");
    return {
      hours: hours || "0",
      minutes: minutes || "0",
      seconds: seconds || "0",
    };
  }

  return { hours: "0", minutes: "0", seconds: "0" };
};

export const TwelveHoursRegex = new RegExp(
  /^(1[0-2]|0?[1-9]):([0-5][0-9])(:[0-5][0-9])?$/
);

export const TwientyFourHoursRegex = new RegExp(
  /^(2[0-3]|[01]?[0-9]):([0-5][0-9])(:[0-5][0-9])?$/
);
