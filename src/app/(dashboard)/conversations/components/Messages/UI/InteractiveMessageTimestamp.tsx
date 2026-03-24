interface InteractiveMessageTimestampProps {
  timestamp: string;
}

export const InteractiveMessageTimestamp = ({
  timestamp,
}: InteractiveMessageTimestampProps) => {
  return (
    <div className="text-right pr-3 pb-2">
      <span className="text-[0.7em] text-[#667781]">{timestamp}</span>
    </div>
  );
};
