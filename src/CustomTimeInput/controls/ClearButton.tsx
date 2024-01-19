import { ReactNode } from "react";

const Clear = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-x"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke="currentColor"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M18 6l-12 12"></path>
      <path d="M6 6l12 12"></path>
    </svg>
  );
};

type Props = {
  onClear: () => void;
  clearAriaLabel?: string | undefined;
  clearIcon?: ReactNode;
  className: string;
  disabled?: boolean;
};
const ClearButton = ({
  onClear,
  clearIcon,
  className,
  disabled,
  clearAriaLabel,
}: Props) => {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        onClear();
      }}
      className={className}
      aria-label={clearAriaLabel}
      disabled={disabled}
    >
      {clearIcon === null ? null : clearIcon ? clearIcon : <Clear />}
    </button>
  );
};

export default ClearButton;
