type CustomTooltipProps = {
  active?: boolean;
  payload?: any[];
  label?: string;
  text?: string;
};

const CustomTooltip = ({
  active,
  payload,
  label,
  text,
}: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="border border-gray-400 shadow-md rounded-lg py-1 px-2 bg-white ">
        <p className="mb-1 momants-light-extrasmall-black">{text}</p>
        <div className="momants-bold-extrasmall-black">{label} - {payload[0].value.toFixed(2)}</div>
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
