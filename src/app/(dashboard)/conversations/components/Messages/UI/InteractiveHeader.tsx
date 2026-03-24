import Image from "next/image";
import { useConversationsStateStore } from "../../../../../../stores/ui/useConversationsStateStore";
import { InteractiveButtonMessagePayload } from "../../../../../../types/InteractiveMessage";
import {
  highlightText,
  useScrollToHighlight,
} from "../../../../../../utils/HighLightText";

type InteractiveHeaderProps = {
  header: NonNullable<InteractiveButtonMessagePayload["header"]>;
};

// Utilities
const basename = (urlOrPath: string) => {
  try {
    const u = new URL(urlOrPath);
    return decodeURIComponent(u.pathname.split("/").pop() || urlOrPath);
  } catch {
    return urlOrPath.split("/").pop() || urlOrPath;
  }
};

const getExt = (name: string) => {
  const m = name.toLowerCase().match(/\.([a-z0-9]+)$/);
  return m ? m[1] : "";
};

export const InteractiveHeader = ({ header }: InteractiveHeaderProps) => {
  const { chatSearchQuery } = useConversationsStateStore();
  const containerRef = useScrollToHighlight(chatSearchQuery);

  switch (header.type) {
    case "text":
      return (
        <p className="pt-[11px] pl-[10px] pr-[9px] m-0" ref={containerRef}>
          {highlightText(header.text, chatSearchQuery)}
        </p>
      );

    case "image":
      return (
        <div
          className="w-full aspect-[16/9] rounded-[12px] overflow-hidden bg-[#f4f4f4]"
          aria-label="Image preview"
        >
          <Image
            className="w-full h-full object-cover block"
            src={header.image.link}
            alt="Image"
            loading="lazy"
          />
        </div>
      );

    case "video":
      return (
        <div
          className="w-full aspect-[16/9] rounded-[12px] overflow-hidden bg-[#f4f4f4]"
          aria-label="Video preview"
        >
          <video
            className="w-full h-full block bg-black"
            src={header.video.link}
            controls
            preload="metadata"
            playsInline
          />
        </div>
      );

    case "document": {
      const link = header.document.link;
      const filename = header.document.filename || basename(link);
      const ext = getExt(filename) || "file";
      const sizeLabel = undefined;

      return (
        <a
          className="flex w-full items-center gap-2.5 rounded-[12px] bg-[#FEFEFE] border border-[#eee] px-3 py-2.5 text-inherit no-underline hover:bg-[#f3f3f3]"
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          title={filename}
        >
          <span className="text-[20px] text-center" aria-hidden>
            {/* simple PDF glyph; swap based on ext if you like */}
            {ext === "pdf" ? "📄" : "📎"}
          </span>

          <div className="flex items-center gap-2 w-full">
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-[14px] whitespace-nowrap overflow-hidden text-ellipsis">
                {filename}
              </div>
              <div className="text-[12px] opacity-70">
                {sizeLabel ? `${sizeLabel} · ${ext}` : ext}
              </div>
            </div>

            <span className="text-[14px] opacity-60" aria-hidden="true">
              ↗
            </span>
          </div>
        </a>
      );
    }

    default:
      return null;
  }
};
