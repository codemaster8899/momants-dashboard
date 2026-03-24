interface SendTagProps {
  send: boolean;
  text?: string;
}

export const SendTag = ({ send, text }: SendTagProps) => {
  const activeClasses = send
    ? "bg-green-100 text-green-700"
    : "bg-yellow-100 text-yellow-700";
  const sendedText = send ? "Sent" : "Queued";

  return (
    <div className={`inline-block rounded-full px-2 py-1 ${activeClasses}`}>
      <p className="leading-xs text-xs">{text || sendedText}</p>
    </div>
  );
};
