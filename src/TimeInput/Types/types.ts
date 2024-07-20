export type TimeInputProps = {
  /**
   * Event function to change the time
   * @type {(value: Date | string) => void}
   */

  onChange?: (value: Date | string) => void;

  /**
   * The value used to control or display the time in the input.
   * @type {Date | string}
   */
  value?: Date | string;

  /**
   * Display the value in the corresponding locale
   * @type {Intl.LocalesArgument}
   */
  currentLocale?: Intl.LocalesArgument;

  /**
   * Whether the time input has to show icon in the placeholder
   * @type {boolean}
   */

  displayIcon?: boolean;

  /**
   * Define the name to describe the time input in forms.
   * @type {string}
   */
  name?: string;

  /**
   * Whether the time input is disabled or not.
   * @type {boolean}
   */
  disabled?: boolean;

  /**
   * Whether the time input is required or not.
   * @type {boolean}
   */
  required?: boolean;

  /**
   * Define the className to change the styles used in the time input
   * @type {string}
   */
  className?: string;

  /**
   * Define custom css className to change the styles as container
   * @type {string}
   */
  customContainerClass?: string;

  /**
   * Define the data-testid used in the time input
   * @type {string}
   */

  dataTestId?: string;

  /**
   * Define the placeholder used in the hours input
   * @type {"--" | "HH" | "hh"}
   */

  hoursPlaceholder?: "--" | "HH" | "hh";

  /**
   * Define the placeholder used in the minutes input
   * @type {"--" | "mm"}
   */

  minutesPlaceholder?: "--" | "mm";
  /**
   * Define the placeholder used in the seconds input
   * @type {"--" | "ss"}
   */
  secondsPlaceholder?: "--" | "ss";

  /**
   * Define the aria-label in clear button
   * @type {string}
   */

  iconAriaLabel?: string;

  /**
   * Define the aria-label in clear button
   * @type {string}
   */
  clearAriaLabel?: string;

  /**
   * Define the aria-label in seconds input controller
   * @type {string}
   */
  secondsAriaLabel?: string;

  /**
   * Define the aria-label in minute input controller
   * @type {string}
   */
  minutesAriaLabel?: string;

  /**
   * Define the aria-label in hour input controller
   * @type {string}
   */

  hoursAriaLabel?: string;

  /**
   * Define the aria-label in AM/PM controller
   * @type {string}
   */
  meridiemAriaLabel?: string;

  /**
   * Define the aria-label in the time input. By default is "time"
   * @type {string}
   */
  ariaLabel?: string;

  /**
   * Whether the time input has to display seconds. Bby default is false
   * @type {boolean}
   */
  hasSeconds?: boolean;

  /**
   * Whether the time input has AM / PM controllers
   * @type {boolean}
   */

  showMeridiemControl?: boolean;

  /**
   * Id to identify the time input
   * @type {string | HTMLInputElement["id"]}
   */

  id?: HTMLInputElement["id"];

  /**
   * If true, applies error styling to the input.
   * @type {boolean}
   */
  isThereError?: boolean;
};
