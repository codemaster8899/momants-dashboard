import { Plus, File, SendHorizontal } from "lucide-react";
import Image from "next/image";

interface PrefilledInputTextExampleProps {
  prefilledText: string;
}

export const PrefilledInputTextExample = ({
  prefilledText,
}: PrefilledInputTextExampleProps) => {
  return (
    <div className="w-full flex justify-center rounded-xl">
      <div
        className="
          relative w-full
          min-h-[160px]
          max-h-[30vh]
          overflow-hidden
          rounded-md
          border
        "
      >
        {/* whatsapp background image */}
        <Image
          src="/images/whatsappBackground.png"
          alt="Background"
          fill
          className="object-cover scale-110"
          sizes="(max-height: 30vh) 100vw, 600px"
        />

        {/* whatsapp input and control  */}
        <div className="absolute bottom-0 left-0 right-0 p-2 bg-stone-100/80 rounded-t-xl flex items-end gap-2">
          <Plus className="w-6 h-6 text-gray-700" />

          <div className="bg-white px-3 py-1 rounded-xl flex-1 min-h-6 break-words overflow-hidden">
            <p className="text-sm text-gray-800 break-all">{prefilledText}</p>
          </div>

          <File className="w-6 h-6 text-gray-700 rotate-180" />

          <div className="rounded-full p-2 bg-green-600 flex items-center justify-center">
            <SendHorizontal className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};
