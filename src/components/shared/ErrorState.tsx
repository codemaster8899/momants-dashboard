import { GlobeX } from "lucide-react";

interface IErrorState {
  text?: string;
}

function ErrorState({
  text = "Something went wrong. Please try again later.",
}: IErrorState) {
  return (
    <div className="w-full h-full min-h-64 flex flex-col items-center justify-center gap-2">
      <GlobeX className="min-w-10 min-h-10 size-10 text-gray-500" />
      <span className="momants-semibold-small-gray">{text}</span>
    </div>
  );
}

export default ErrorState;
