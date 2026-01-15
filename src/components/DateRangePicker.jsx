import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export default function DateRangePicker({ value, onChange }) {
  return (
    <DateRange
      ranges={[
        {
          startDate: value.startDate,
          endDate: value.endDate,
          key: "selection",
        },
      ]}
      minDate={new Date()}
      onChange={(ranges) => {
        onChange({
          startDate: ranges.selection.startDate,
          endDate: ranges.selection.endDate,
        });
      }}
    />
  );
}
