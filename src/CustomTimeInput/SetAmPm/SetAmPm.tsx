import { memo } from "react";
import { AMPMProps } from "../../CustomTimeInput/types/types";

const SetAmPm = memo(
  ({
    amPm,
    setAmPm,
    meridiemAriaLabel = "meridiam",
    onClickMeridiem,
    disabled,
  }: AMPMProps) => {
    const showMeridiam = (meridiam: "AM" | "PM") => meridiam;
    return (
      <div
        aria-label={meridiemAriaLabel}
        className={"meridiamControls"}
        role={"button"}
        onClick={(e) => {
          e.preventDefault();
          onClickMeridiem && onClickMeridiem(amPm);
        }}
      >
        {amPm === "AM" ? (
          <div className={`showingMeridiam ${amPm}`}>
            <button disabled={disabled} onClick={() => setAmPm("AM")}>
              {showMeridiam("AM")}
            </button>
            <span>/</span>
            <button disabled={disabled} onClick={() => setAmPm("PM")}>
              {showMeridiam("PM")}
            </button>
          </div>
        ) : (
          <div className={`showingMeridiam ${amPm}`}>
            <button disabled={disabled} onClick={() => setAmPm("AM")}>
              {showMeridiam("AM")}
            </button>
            <span>/</span>
            <button disabled={disabled} onClick={() => setAmPm("PM")}>
              {showMeridiam("PM")}
            </button>
          </div>
        )}
      </div>
    );
  }
);

export default SetAmPm;
