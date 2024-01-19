import { TimeInputProps } from "../../CustomTimeInput/types/types";

type IconProps = Pick<
  TimeInputProps,
  "icon" | "onIconClick" | "iconAriaLabel"
> & {
  onClick: () => void;
};

const Icon = ({ icon, onIconClick, onClick, iconAriaLabel }: IconProps) => {
  return (
    <div
      className={"iconContainer"}
      onClick={() => {
        if (onClick) onClick();
        if (onIconClick) onClick();
      }}
      role={"button"}
      aria-label={iconAriaLabel}
    >
      {icon}
    </div>
  );
};
export default Icon;
