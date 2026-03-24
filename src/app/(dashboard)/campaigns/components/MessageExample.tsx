import { Plus, File, SendHorizontal } from "lucide-react";
import Image from "next/image";
import { getFormattedTime } from "../../../../utils/timeFormatters";

interface MessageExampleProps {
  messageText: string;
}

export const MessageExample = ({ messageText }: MessageExampleProps) => {
  const getMessageTime = getFormattedTime();

  return (
    <div className="w-full flex justify-center rounded-xl">
      <div className="relative w-full min-h-[160px] rounded-md border overflow-hidden">
        {/* whatsapp background pattern - repeating */}
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

        {/* content wrapper to establish height */}
        <div className="relative min-h-[160px] pb-14">
          {/* message bubble */}
          {messageText && (
            <div className="pt-4 px-4">
              <div className="max-w-[75%] min-w-[10px]">
                <div className="bg-white rounded-lg rounded-tl-none px-3 py-2 shadow-sm">
                  <p className="text-sm text-gray-800 break-words whitespace-pre-wrap">
                    {messageText}
                  </p>
                  <div className="flex items-center justify-end gap-1 mt-1">
                    <span className="text-[10px] text-gray-500">
                      {getMessageTime}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* whatsapp input and control  */}
          <div className="absolute bottom-0 left-0 right-0 p-2 bg-stone-100/80 rounded-t-xl flex items-end gap-2">
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
