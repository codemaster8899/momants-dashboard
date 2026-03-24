import { cn } from "@/lib/utils";
import { getFormattedTime } from "@/utils/timeFormatters";
import { File, Plus, Reply, SendHorizontal } from "lucide-react";
import Image from "next/image";
import type { TButton } from "../types";

interface MessageExampleProps {
  messageText: string;
  buttons: TButton[];
  active?: boolean;
  size?: string;
}

export const MessageExample = ({
  messageText,
  buttons,
  size = "160px",
}: MessageExampleProps) => {
  const getMessageTime = getFormattedTime();
  const validButtons = buttons.filter((b) => Boolean(b.text));

  return (
    <div className="w-full flex justify-center rounded-xl relative">
      <div
        className="relative w-full rounded-md border overflow-hidden z-0"
        style={{ minHeight: size }}
      >
        {/* whatsapp background */}
        <div className="absolute inset-0">
          <div className="w-full h-full opacity-80">
            <Image
              src="/images/whatsappBackground.png"
              alt="Background"
              width={600}
              height={600}
              className="object-cover w-full h-auto min-h-full"
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
          </div>
        </div>

        {/* content wrapper */}
        <div className="relative pb-14" style={{ minHeight: size }}>
          {messageText && (
            <div className="pt-4 px-4">
              <div className="max-w-[75%] min-w-[10px]">
                <div
                  className={`bg-white rounded-tl-none px-3 py-2 shadow-sm ${
                    validButtons.length === 0 ? "rounded-lg" : "rounded-t-lg"
                  }`}
                >
                  <p className="text-sm text-gray-800 break-words whitespace-pre-wrap">
                    {messageText}
                  </p>
                  <div className="flex items-center justify-end gap-1 mt-1">
                    <span className="text-[10px] text-gray-500">
                      {getMessageTime}
                    </span>
                  </div>
                </div>

                {buttons.map((button, index) => {
                  if (!button.text) return null;

                  const isLast: boolean =
                    buttons.findIndex((b, i) => i > index && b.text) === -1;

                  return (
                    <div
                      key={index}
                      className={cn(
                        "flex text-green-600 text-sm items-center justify-center gap-2 bg-white text-center border-t border-gray-200 py-2",
                        isLast && "rounded-b-lg",
                      )}
                    >
                      <Reply size={18} />
                      {button.text}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* whatsapp input and control */}
          <div className="absolute bottom-0 left-0 right-0 p-2 bg-stone-100/80 rounded-t-xl flex items-end gap-2 z-30">
            <Plus className="w-6 h-6 text-gray-700" />
            <div className="bg-white px-3 py-1 rounded-xl flex-1 min-h-6 break-words">
              <p className="text-sm text-gray-800 break-words"></p>
            </div>
            <File className="w-6 h-6 text-gray-700 rotate-180" />
            <div className="rounded-full p-2 bg-green-600 flex items-center justify-center">
              <SendHorizontal className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
