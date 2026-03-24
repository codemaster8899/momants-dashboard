import { QRCodeCanvas } from "qrcode.react";

export type QrCodeImageProps = {
  qrCodeUrl: string;
  active: boolean;
  size?: number;
};


export const QrCodeImage = ({
  qrCodeUrl,
  active,
  size = 100,
}: QrCodeImageProps) => {
  return (
    <div className="border border-gray-300 rounded p-2">
      <QRCodeCanvas
        value={qrCodeUrl}
        size={size}
        bgColor="#ffffff"
        fgColor={active ? "#000000" : "#9CA3AF"}
        level="H"
      />
    </div>
  );
};
