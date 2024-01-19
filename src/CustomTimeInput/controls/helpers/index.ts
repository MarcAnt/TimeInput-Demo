export const addHours = (
  prev: string,
  is12Hours: boolean | undefined,
  stepHours?: number
) => {
  let addedHours: number | undefined = stepHours;

  if (stepHours && stepHours < 0) {
    addedHours = 0;
  }

  const newHour =
    prev === ""
      ? 1
      : addedHours
      ? parseInt(prev) + addedHours
      : parseInt(prev) + 1;

  if (is12Hours) {
    if (newHour <= 12) return newHour.toString();
  } else {
    if (newHour <= 23) return newHour.toString();
  }

  return prev;
};

export const removeHours = (
  prev: string,
  is12Hours: boolean | undefined,
  stepHours?: number
) => {
  const newHour =
    prev === ""
      ? 0
      : stepHours
      ? parseInt(prev) - stepHours
      : parseInt(prev) - 1;

  console.log(newHour, prev);
  if (is12Hours) {
    if (newHour >= 1) return newHour.toString();
  } else {
    if (newHour >= 0) return newHour.toString();
  }

  return prev;
};

export const addMinutes = (prev: string, stepMinutes?: number) => {
  let addedMinutes: number | undefined = stepMinutes;

  if (stepMinutes && stepMinutes < 0) {
    addedMinutes = 0;
  }

  const newHour =
    prev === ""
      ? 1
      : addedMinutes
      ? addedMinutes + parseInt(prev)
      : parseInt(prev) + 1;

  if (newHour <= 59) {
    return newHour.toString();
  }
  return prev;
};

export const removeMinutes = (prev: string, stepMinutes?: number) => {
  let addedMinutes: number | undefined = stepMinutes;

  if (stepMinutes && stepMinutes < 0) {
    addedMinutes = 0;
  }

  const newHour =
    prev === ""
      ? 0
      : addedMinutes
      ? parseInt(prev) - addedMinutes
      : parseInt(prev) - 1;
  if (newHour >= 0) {
    return newHour.toString();
  }
  return prev;
};

export const addSeconds = (prev: string, stepSeconds?: number) => {
  let addedSeconds: number | undefined = stepSeconds;

  if (stepSeconds && stepSeconds < 0) {
    addedSeconds = 0;
  }

  const newHour =
    prev === ""
      ? 1
      : addedSeconds
      ? addedSeconds + parseInt(prev)
      : parseInt(prev) + 1;
  if (newHour <= 59) {
    return newHour.toString();
  }
  return prev;
};

export const removeSeconds = (prev: string, stepSeconds?: number) => {
  let seconds: number | undefined = stepSeconds;

  if (stepSeconds && stepSeconds <= 0) {
    seconds = 0;
  }

  const newHour =
    prev === "" ? 0 : seconds ? parseInt(prev) - seconds : parseInt(prev) - 1;
  if (newHour >= 0) {
    return newHour.toString();
  }
  return prev;
};

export const setFocusOnInput = (
  ref: React.MutableRefObject<HTMLInputElement | null>
) => {
  ref.current?.select();
  ref.current?.focus();
};
