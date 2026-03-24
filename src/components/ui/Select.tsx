import { twMerge } from "tailwind-merge";

type SelectProps = {
  value: string;
  options: string[];
  customClassName?: string;
  handleChange: (value: string) => void;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

function Select({
  value,
  options,
  customClassName,
  handleChange,
  ...props
}: SelectProps) {
  return (
    <select
      {...props}
      value={value}
      onChange={(e) => handleChange(e.target.value)}
      className={twMerge(
        "mt-1 w-full border rounded-md px-3 py-2 momants-light-small-darkgray focus:outline-none focus:ring-2 bg-white focus:ring-black",
        customClassName,
      )}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

export default Select;
