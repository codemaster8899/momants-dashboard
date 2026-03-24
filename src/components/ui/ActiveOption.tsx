type ActiveOptionProps = {
  option: string;
  toggleFilter: (label: string) => void;
};

export const ActiveOption = ({ option, toggleFilter }: ActiveOptionProps) => {
  return (
    <button
      type="button"
      onClick={() => toggleFilter(option)}
      className="
        momants-light-small-gray rounded-3xl py-1 px-2 border transition-colors
        border-gray-500 bg-gray-50"
    >
      {option}
      <span className="ml-2 momants-light-small-gray hover:momants-light-small-darkgray cursor-pointer">
        ×
      </span>
    </button>
  );
};
