import TimeInput from "./CustomTimeInput/TimeInput";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  timeInput: z
    .string({
      required_error: "Required",
    })
    .regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
      message: "Bad time format",
    })
    .min(1),
  example: z.string().min(1),
});

const Standalone = () => {
  const { control } = useForm({
    defaultValues: {
      timeInput: new Date().toISOString(),
    },
    resolver: zodResolver(schema),
    mode: "all",
  });

  return (
    <div>
      <Controller
        name={"timeInput"}
        control={control}
        render={({ field }) => {
          return (
            <TimeInput
              onChange={field.onChange}
              format={"HH:mm a"}
              is12Hours={false}
              value={field.value}
              name={"timeInput"}
              id={"timeInput"}
              currentLocale={"es"}
              iconPosition={"start"}
              iconAriaLabel="clock"
              hoursPlaceholder={"hh"}
              minutesPlaceholder={"mm"}
              secondsPlaceholder={"ss"}
              className={"myCustomClass"}
              withControls={true}
              withClearButton={true}
              hasSeconds={false}
            ></TimeInput>
          );
        }}
      />
    </div>
  );
};

export default Standalone;
