import { describe, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import CustomTimeInput from "../TimeInput";
import { getCurrentTime } from "./utils";
import userEvent from "@testing-library/user-event";

describe("TimeInput basic testing", () => {
  const fn = vi.fn();
  test("CustomTimeInput should be displayed in the document", () => {
    render(<CustomTimeInput onChange={fn} value={"10:30"} />);
    const timeInput = screen.getByLabelText("time");
    expect(timeInput).toBeInTheDocument();
  });

  test("Should be display correct hours on time string", () => {
    render(<CustomTimeInput onChange={fn} value={"10:30"} />);

    const hours = screen.getByLabelText("hours");
    expect(hours).toHaveDisplayValue("10");
  });

  test("Should be display correct minutes on time string", () => {
    render(<CustomTimeInput onChange={fn} value={"10:30"} />);

    const minutes = screen.getByLabelText("minutes");
    expect(minutes).toHaveDisplayValue("30");
  });

  test("Should be display 00:00 time if value has bad time format", () => {
    render(<CustomTimeInput onChange={fn} value={"10:3"} />);

    const minutes = screen.getByLabelText("minutes");
    const hours = screen.getByLabelText("hours");

    expect(screen.getByLabelText("time")).toHaveDisplayValue("00:00");
    expect(minutes).toHaveDisplayValue("0");
    expect(hours).toHaveDisplayValue("0");
  });

  test("Should be display 00:00 time if value the string text", () => {
    render(<CustomTimeInput onChange={fn} value={"time"} />);

    const minutes = screen.getByLabelText("minutes");
    const hours = screen.getByLabelText("hours");

    expect(minutes).toHaveDisplayValue("0");
    expect(hours).toHaveDisplayValue("0");
  });

  test("Should display 00:00 time if the value is an empty string", () => {
    render(<CustomTimeInput onChange={fn} value={""} />);

    const minutes = screen.getByLabelText("minutes");
    const hours = screen.getByLabelText("hours");

    expect(minutes).toHaveDisplayValue("0");
    expect(hours).toHaveDisplayValue("0");
  });

  test("Should display current time if the value is a Date()", () => {
    render(
      <CustomTimeInput onChange={fn} value={new Date("10/20/2024 01:01")} />
    );

    const { hours: timeHours, minutes: timeMinutes } = getCurrentTime(
      undefined,
      "10/20/2024 01:01"
    );
    const minutesInput = screen.getByLabelText("minutes");
    const hoursInput = screen.getByLabelText("hours");

    expect(minutesInput).toHaveDisplayValue(`${+timeMinutes}`);
    expect(hoursInput).toHaveDisplayValue(`${+timeHours}`);
  });

  test("Should display current time if the value is a toISOString date format", () => {
    render(<CustomTimeInput onChange={fn} value={new Date().toISOString()} />);

    const { hours: timeHours, minutes: timeMinutes } = getCurrentTime();
    const minutesInput = screen.getByLabelText("minutes");
    const hoursInput = screen.getByLabelText("hours") as HTMLInputElement;

    // screen.debug([minutesInput, hoursInput]);
    // screen.debug(screen.getByLabelText("time"));

    expect(minutesInput).toHaveDisplayValue(`${+timeMinutes}`);
    expect(hoursInput.value).toBe(`${+timeHours}`);
  });

  //Arreglar cuando 01:01
  //Arrgelar cuando 12:00
  test("Should display current time if the value is less than 10 minutes and minutes", () => {
    render(
      <CustomTimeInput
        onChange={fn}
        value={"01:01"}
        aria-label={"time-input"}
      />
    );
    const minutes = screen.getByLabelText("minutes");
    const hours = screen.getByLabelText("hours");

    expect(screen.getByLabelText("time")).toHaveDisplayValue(`01:01`);
    expect(minutes).toHaveDisplayValue(`1`);
    expect(hours).toHaveDisplayValue(`1`);
  });

  test("Should display current time if the value 12:00", () => {
    render(
      <CustomTimeInput
        onChange={fn}
        value={"12:00"}
        aria-label={"time-input"}
      />
    );
    const minutes = screen.getByLabelText("minutes");
    const hours = screen.getByLabelText("hours");

    expect(screen.getByLabelText("time")).toHaveDisplayValue(`12:00`);

    // screen.debug([hours, minutes]);
    expect(minutes).toHaveDisplayValue(`0`);
    expect(hours).toHaveDisplayValue(`12`);
  });

  test("Should display time if the value 00:00 in 24 hours format", () => {
    render(
      <CustomTimeInput
        onChange={fn}
        value={"00:00"}
        is12Hours={false}
        aria-label={"time-input"}
      />
    );
    const minutes = screen.getByLabelText("minutes");
    const hours = screen.getByLabelText("hours");

    expect(screen.getByLabelText("time")).toHaveDisplayValue(`00:00`);

    // screen.debug([hours, minutes]);
    expect(minutes).toHaveDisplayValue(`0`);
    expect(hours).toHaveDisplayValue(`0`);
  });

  test("Should display current time if the value have seconds", () => {
    render(
      <CustomTimeInput
        onChange={fn}
        value={"12:50:30"}
        aria-label={"time-input"}
        hasSeconds={true}
      />
    );
    const minutes = screen.getByLabelText("minutes");
    const hours = screen.getByLabelText("hours");
    const seconds = screen.getByLabelText("seconds");

    expect(screen.getByLabelText("time")).toHaveDisplayValue(`12:50`);
    expect(hours).toHaveDisplayValue(`12`);
    expect(minutes).toHaveDisplayValue(`50`);
    expect(seconds).toHaveDisplayValue(`30`);
  });

  test("Should display all control buttons", () => {
    render(
      <CustomTimeInput
        onChange={fn}
        withControls
        withClearButton={true}
        is12Hours={true}
        value={new Date().toISOString()}
      />
    );

    const clearButton = screen.getByRole("button", { name: "clear" });
    const hoursControls = screen.getByLabelText("hours-controls");
    const minutesControls = screen.getByLabelText("minutes-controls");
    const MeridiamButtons = screen.getByRole("button", {
      name: "meridiam-controls",
    });

    expect(clearButton).toBeInTheDocument();
    expect(hoursControls).toBeInTheDocument();
    expect(minutesControls).toBeInTheDocument();
    expect(MeridiamButtons).toBeInTheDocument();
  });

  test("Should not display all control buttons", () => {
    render(
      <CustomTimeInput
        onChange={fn}
        withControls={false}
        withClearButton={false}
        is12Hours={false}
        value={new Date().toISOString()}
      />
    );

    const clearButton = screen.queryByRole("button", { name: "clear" });
    const hoursControls = screen.queryByLabelText("hours-controls");
    const minutesControls = screen.queryByLabelText("minutes-controls");
    const MeridiamButtons = screen.queryByRole("button", {
      name: "meridiam-controls",
    });

    expect(clearButton).not.toBeInTheDocument();
    expect(hoursControls).not.toBeInTheDocument();
    expect(minutesControls).not.toBeInTheDocument();
    expect(MeridiamButtons).not.toBeInTheDocument();
  });

  test("Should clear or reset to 0 hours and 0 minutes", async () => {
    const user = userEvent.setup();

    render(
      <CustomTimeInput
        onChange={fn}
        withClearButton={true}
        value={new Date().toISOString()}
      />
    );

    const clearButton = screen.getByRole("button", { name: "clear" });

    const minutes = screen.getByLabelText("minutes");
    const hours = screen.getByLabelText("hours");

    await user.click(clearButton);
    expect(minutes).toHaveDisplayValue("0");
    expect(hours).toHaveDisplayValue("0");
  });

  test("Should not show control arrow buttons", async () => {
    render(
      <CustomTimeInput onChange={fn} withClearButton={false} value={"10:00"} />
    );
    const hourControls = screen.queryByLabelText("hours-controls");
    expect(hourControls).not.toBeInTheDocument();
  });

  test("Should set hours when the user click on arrow down to remove hour", async () => {
    const user = userEvent.setup();

    render(
      <CustomTimeInput
        onChange={fn}
        withClearButton={true}
        withControls={true}
        value={"10:00"}
      />
    );
    const hourControls = within(screen.getByLabelText("hours-controls"));
    const removeHourButton = hourControls.getAllByRole("button")[1];
    await user.click(removeHourButton);
    const time = screen.getByLabelText("time") as HTMLInputElement;
    const hours = time.value.split(":")[0];
    expect(hours).toBe("09");
  });

  test("Should set hours when the user click on arrow up to add hour", async () => {
    const user = userEvent.setup();

    render(
      <CustomTimeInput
        onChange={fn}
        withClearButton={true}
        withControls={true}
        value={"10:00"}
      />
    );
    const hourControls = within(screen.getByLabelText("hours-controls"));
    const addHourButton = hourControls.getAllByRole("button")[0];
    await user.click(addHourButton);
    const time = screen.getByLabelText("time") as HTMLInputElement;
    const hours = time.value.split(":")[0];
    expect(hours).toBe("11");
  });

  // test("Should set hours when the user type", async () => {
  //   render(
  //     <CustomTimeInput onChange={fn} is12Hours={true} value={new Date()} />
  //   );

  //   const hoursInput = screen.getByRole("spinbutton", {
  //     name: /hours/i,
  //   }) as HTMLInputElement;
  //   const time = screen.getByLabelText("time") as HTMLInputElement;
  //   // const timeInput = screen.getByLabelText("timeInput") as HTMLInputElement;
  //   // screen.logTestingPlaygroundURL();
  //   // await user.keyboard("11");
  //   hoursInput.focus();

  //   await userEvent.keyboard("1");
  //   await userEvent.type(hoursInput, "1");
  //   hoursInput.blur();

  //   // screen.debug([hoursInput, time]);

  //   // const hours = time.value.split(":")[0];
  //   // expect(hours).toBe("11");
  // });

  test("Should not set hours when the user type a wrong hour", async () => {
    const user = userEvent.setup();

    render(
      <CustomTimeInput
        onChange={fn}
        withClearButton={true}
        is12Hours={true}
        value={"10:00"}
      />
    );
    const hours = screen.getByLabelText("hours");

    await user.click(hours);
    await user.keyboard("50");
    expect(hours).not.toHaveDisplayValue("50");
  });
});

describe("TimeInput testing user interactions and buttons", () => {
  const fn = vi.fn();

  test("Should set hours when the user click on arrow down to remove hour", async () => {
    const user = userEvent.setup();

    render(
      <CustomTimeInput
        onChange={fn}
        withClearButton={true}
        withControls={true}
        value={"10:00"}
      />
    );
    const hourControls = within(screen.getByLabelText("hours-controls"));
    const removeHourButton = hourControls.getAllByRole("button")[1];
    await user.click(removeHourButton);
    const time = screen.getByLabelText("time") as HTMLInputElement;
    const hours = time.value.split(":")[0];
    expect(hours).toBe("09");
  });
  test("Should set hours when the user click on arrow up to add hour", async () => {
    const user = userEvent.setup();

    render(
      <CustomTimeInput
        onChange={fn}
        withClearButton={true}
        withControls={true}
        value={"10:00"}
      />
    );
    const hourControls = within(screen.getByLabelText("hours-controls"));
    const addHourButton = hourControls.getAllByRole("button")[0];
    await user.click(addHourButton);
    const time = screen.getByLabelText("time") as HTMLInputElement;
    const hours = time.value.split(":")[0];
    expect(hours).toBe("11");
  });

  // test("Should set hours when the user type", async () => {
  //   render(
  //     <CustomTimeInput onChange={fn} is12Hours={true} value={new Date()} />
  //   );

  //   const hoursInput = screen.getByRole("spinbutton", {
  //     name: /hours/i,
  //   }) as HTMLInputElement;
  //   const time = screen.getByLabelText("time") as HTMLInputElement;
  //   // const h = screen.getByLabelText("timeInput") as HTMLInputElement;
  //   // screen.logTestingPlaygroundURL();
  //   // await user.keyboard("11");
  //   hoursInput.focus();

  //   // await userEvent.keyboard("1");
  //   await userEvent.type(hoursInput, "1");
  //   hoursInput.blur();

  //   screen.debug([hoursInput, time]);

  //   const hours = time.value.split(":")[0];
  //   expect(hours).toBe("11");
  // });

  test("Should not set hours when the user type a wrong hour", async () => {
    const user = userEvent.setup();

    render(
      <CustomTimeInput
        onChange={fn}
        withClearButton={true}
        is12Hours={true}
        value={"10:00"}
      />
    );
    const hours = screen.getByLabelText("hours");

    await user.click(hours);
    await user.keyboard("50");
    expect(hours).not.toHaveDisplayValue("50");
  });

  test("Should display an empty string after delete the current value", async () => {
    const user = userEvent.setup();

    render(
      <CustomTimeInput
        onChange={fn}
        withClearButton={true}
        is12Hours={true}
        value={"10:00"}
      />
    );
    const hours = screen.getByLabelText("hours");
    const minutes = screen.getByLabelText("minutes");
    await user.click(hours);
    await user.keyboard(" ");
    await user.clear(hours);
    await user.click(minutes);
    await user.keyboard(" ");
    await user.clear(minutes);
    expect(hours).toHaveDisplayValue("");
    expect(hours).not.toHaveDisplayValue("0");
    expect(hours).not.toHaveDisplayValue("10");
    expect(minutes).toHaveDisplayValue("");
    expect(minutes).not.toHaveDisplayValue("0");
    expect(minutes).not.toHaveDisplayValue("00");
  });
});
