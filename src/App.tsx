import TimeInput from "./CustomTimeInput/TimeInput";
import { IconClock } from "@tabler/icons-react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// import UpArrow from "./assets/Icons/UpArrow";
// import DownArrow from "./assets/Icons/DownArrow";
// import "./CustomTimeInput/styles/styles.css";
// import "./App.css";
import "./example-styles.css";
import "./clorian-style.css";

import Standalone from "./Standalone";
import { TwientyFourHoursRegex } from "./CustomTimeInput/utils";

type FormValues = { timeInput1: string; timeInput2: string; example: string };

const schema = z.object({
  timeInput1: z
    .string({
      required_error: "Required",
    })
    .regex(TwientyFourHoursRegex, {
      message: "Bad time format",
    })
    .min(1),
  timeInput2: z
    .string({
      required_error: "Required",
    })
    .regex(TwientyFourHoursRegex, {
      message: "Bad time format",
    })
    .min(1),
  example: z.string().min(1, { message: "required" }),
});

function App() {
  // const [time, setTime] = useState<string | Date>(
  //   // new Date('2024-02-22T13:30:00.000Z')
  //   // new Date().toISOString()
  //   // new Date(2023, 7, 29, 12, 30)
  //   // "7:50"
  //   new Date()
  //   //new Date("10/20/2024 01:01") //Revisar esye formato
  //   // "10:00"
  // );

  // const handleChangeTime = (time: string | Date) => {
  //   setTime(time);
  // };

  const {
    control,
    formState: { errors, isValid },
    getValues,
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: {
      timeInput1: "10:00",
      timeInput2: new Date().toISOString(),
      example: "",
    },
    resolver: zodResolver(schema),
    mode: "all",
  });

  const submitForm: SubmitHandler<FormValues> = (values) => {
    console.log(values);
  };

  return (
    <>
      <div className={"app"}>
        <Standalone />
        <div className="divider"></div>
        <div className="example-form">
          <form onSubmit={handleSubmit(submitForm)}>
            <Controller
              name={"timeInput1"}
              control={control}
              render={({ field }) => {
                return (
                  <TimeInput
                    onChange={field.onChange}
                    format={"HH:mm a"}
                    is12Hours={false}
                    value={field.value}
                    name={"timeInput1"}
                    id={"timeInput1"}
                    currentLocale={"es"}
                    icon={<IconClock />}
                    iconPosition={"start"}
                    iconAriaLabel="clock"
                    hoursPlaceholder={"hh"}
                    minutesPlaceholder={"mm"}
                    secondsPlaceholder={"ss"}
                    className={"myCustomClass"}
                    withControls={true}
                    withClearButton={true}
                    hasSeconds={false}
                    showMeridiemControl={false}
                  ></TimeInput>
                );
              }}
            />
            {errors.timeInput1?.message && <p>{errors.timeInput1?.message}</p>}

            <Controller
              name={"timeInput2"}
              control={control}
              render={({ field }) => {
                return (
                  <TimeInput
                    onChange={field.onChange}
                    format={"HH:mm a"}
                    is12Hours={false}
                    value={field.value}
                    name={"timeInput2"}
                    id={"timeInput2"}
                    currentLocale={"es"}
                    icon={<IconClock />}
                    iconPosition={"start"}
                    iconAriaLabel="clock"
                    hoursPlaceholder={"hh"}
                    minutesPlaceholder={"mm"}
                    secondsPlaceholder={"ss"}
                    className={"myCustomClass"}
                    withControls={true}
                    withClearButton={true}
                    hasSeconds={false}
                    showMeridiemControl={false}
                    disabled={true}
                  ></TimeInput>
                );
              }}
            />

            {errors.timeInput2?.message && <p>{errors.timeInput2?.message}</p>}

            <Controller
              name={"example"}
              control={control}
              render={({ field }) => {
                return (
                  <input
                    type="text"
                    onChange={field.onChange}
                    value={field.value}
                  />
                );
              }}
            />

            {errors.example?.message && <p>{errors.example?.message}</p>}

            <div>{JSON.stringify(getValues(), undefined, 2)}</div>

            <button
              disabled={!isValid}
              className="clorian-button"
              type="submit"
            >
              Save!
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
