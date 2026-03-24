type InactiveOptionProps = {
  option: string;
  toggleFilter: (label: string) => void;
};

export const InactiveOption = ({
  option,
  toggleFilter,
}: InactiveOptionProps) => {
  return (
    <button
      type="button"
      onClick={() => toggleFilter(option)}
      className="
        rounded-2xl py-1 px-2 border transition-colors
        momants-light-small-gray border-gray-300 hover:bg-gray-100"
    >
      {option}
    </button>
  );
};
