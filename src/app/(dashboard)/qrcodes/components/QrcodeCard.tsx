import { ConfirmPopup } from "@/components/Layout/ConfirmPopup";
import { Switch } from "@/components/ui/Switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { EllipsisVertical, ExternalLink } from "lucide-react";
import { useState } from "react";
import { DownloadButton } from "./DownloadButton";
import { QrCodeImage } from "./QrCodeImage";
import type { IQrCodes } from "../types";
import { twMerge } from "tailwind-merge";

export interface QrCodeCardProps {
  qrCode: IQrCodes;
  onEdit: (qrCode: IQrCodes) => void;
  onToggle: (value: boolean) => void;
  onDownload: (
    url: string,
    fileName: string,
    type: "png" | "svg" | "pdf",
  ) => void;
  onDelete: () => void;
}

export const QrCodeCard = ({
  qrCode,
  onEdit,
  onToggle,
  onDelete,
  onDownload,
}: QrCodeCardProps) => {
  const [showPopup, setShowPopup] = useState(false);
  const [pendingToggle, setPendingToggle] = useState(false);
  const {
    is_active,
    name,
    page_views: pageViews,
    redirect_url: redirectUrl,
    message_platform: preFilledMessage,
  } = qrCode;

  const activeHeaderStyle = is_active
    ? "momants-semibold-medium-black"
    : "momants-light-medium-gray";

  const activeSubHeaderStyle = is_active
    ? "momants-light-extrasmall-black"
    : "momants-light-extrasmall-gray";

  const handleSwitchChange = (newValue: boolean) => {
    setPendingToggle(newValue);
    setShowPopup(true);
  };

  const handleConfirm = () => {
    setShowPopup(false);
    onToggle(pendingToggle);
  };

  const handleCancel = () => {
    setShowPopup(false);
  };

  return (
    <>
      <div className="bg-white border rounded-lg shadow-sm flex flex-col gap-3 w-full">
        <div className="flex items-start gap-3 p-3">
          <QrCodeImage qrCodeUrl={redirectUrl} size={60} active={is_active} />
          <div className="flex flex-col gap-1">
            <h2
              className={twMerge("font-sans align-middle", activeHeaderStyle)}
            >
              {name ?? "No name"}
            </h2>
            <p
              className={twMerge(
                "leading-snug line-clamp-2",
                activeSubHeaderStyle,
              )}
            >
              Times scanned: {pageViews}
            </p>
          </div>

          {/* Options Dropdown menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="ml-auto p-1 rounded hover:bg-gray-100 focus:outline-none">
                <EllipsisVertical
                  className={twMerge("w-5 h-5", activeHeaderStyle)}
                />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              side="bottom"
              align="end"
              className="min-w-[120px] bg-white border rounded-md shadow-md p-1 z-50"
            >
              {["Edit", "Delete"].map((option, idx) => (
                <DropdownMenuItem
                  key={option}
                  onClick={() => (idx ? onDelete() : onEdit(qrCode))}
                  className="mx-auto px-3 py-2 hover:bg-gray-100 momants-light-small-black cursor-pointer rounded-md focus:outline-none"
                >
                  {option}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {preFilledMessage && (
          <p className="ml-4 text-xs">
            <span className={activeSubHeaderStyle}>
              Initial message: {preFilledMessage}
            </span>
          </p>
        )}

        <hr className="border-gray-200 -mb-2" />
        <div className="flex items-center justify-between px-4 py-2">
          <a
            href={redirectUrl}
            target="_blank"
            className="flex items-center gap-1 hover:cursor-pointer"
          >
            <p
              className={twMerge(
                "text-xs",
                is_active ? "text-gray-600" : "text-gray-400",
              )}
            >
              Open url
            </p>
            <ExternalLink
              className={twMerge("w-4 h-4 mb-[0.95px", activeHeaderStyle)}
            />
          </a>

          <div className="flex items-center gap-5">
            {/* Download Dropdown */}
            <DownloadButton
              active={is_active}
              DownloadTypes={["png", "svg", "pdf"]}
              buttonText="Download QR code"
              onDownload={(type) => onDownload(redirectUrl, name, type)}
            />
            <Switch
              length={40}
              checked={is_active}
              onChange={handleSwitchChange}
            />
          </div>
        </div>
      </div>

      {showPopup && (
        <ConfirmPopup
          title={`${pendingToggle ? "Enable" : "Disable"} QR code?`}
          description={`Click "Confirm" to ${
            pendingToggle ? "enable" : "disable"
          } "${name}" or "Cancel" to keep it ${is_active ? "active" : "inactive"}.`}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </>
  );
};
