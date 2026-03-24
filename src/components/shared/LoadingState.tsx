import { Loader2 } from "lucide-react";

function LoadingState() {
  return (
    <div className="w-full h-full min-h-64 flex flex-col items-center justify-center gap-2">
      <Loader2 className="min-w-10 min-h-10 size-10 text-gray-500 animate-spin" />
      <span className="momants-semibold-small-gray">Loading</span>
    </div>
  );
}

export default LoadingState;
