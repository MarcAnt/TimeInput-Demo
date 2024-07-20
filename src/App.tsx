import { useState } from "react";
import TimeInput from "./TimeInput/TimeInput";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

type FormValues = { timeInput: string };

const schema = z.object({
  timeInput: z
    .string({
      required_error: "Required",
    })
    .time()
    .min(1),
});

function App() {
  const { control, watch, reset } = useForm<FormValues>({
    defaultValues: {
      timeInput: new Date().toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const [timeInput, setTimeInput] = useState<string | Date>("15:00:00");

  return (
    <div className="time-inputs-container">
      <div className="time-input-container">
        <p>Basic TimeInput (not controlled input)</p>
        <p>Initial time: 10:30:00</p>
        <TimeInput
          value={"10:30:00"}
          hoursPlaceholder="HH"
          minutesPlaceholder="mm"
          secondsPlaceholder="ss"
          hasSeconds
        />
      </div>
      <div className="time-input-container">
        <p>Controlled TimeInput</p>
        <p>
          Initial time:{" "}
          {timeInput instanceof Date
            ? timeInput.toLocaleTimeString()
            : timeInput}
        </p>

        <TimeInput
          value={timeInput}
          onChange={(value) => setTimeInput(value)}
          hasSeconds
        />
      </div>

      <div className="time-input-container">
        <p>Controlled TimeInput with react-hook-form </p>
        <p>Initial time: {watch("timeInput")}</p>
        <button className="button-reset" onClick={() => reset()}>
          Reset
        </button>
        <Controller
          name={"timeInput"}
          control={control}
          render={({ field }) => {
            return (
              <TimeInput
                onChange={(value) => {
                  field.onChange(value);
                }}
                value={field.value}
              />
            );
          }}
        />
      </div>
    </div>
  );
}

export default App;
