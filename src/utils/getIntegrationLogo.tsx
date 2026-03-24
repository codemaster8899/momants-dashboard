import { BotMessageSquare } from "lucide-react";
import Image from "next/image";

export const getIntegrationLogo = (logo?: string, length?: number) => {
  // Instagram
  const logoSize = length || 16;

  if (logo === "Embedded chat") {
    return (
      <BotMessageSquare
        size={logoSize - 3}
        color={"#151515"}
      />
    );
  } else if (logo === "Whatsapp - WaAPI" || logo === "Whatsapp - Meta") {
    return (
      <div>
        <Image
          src={
            "https://momants-dashboard.ams3.cdn.digitaloceanspaces.com/Whatsapp-icon.svg"
          }
          alt={"whatsapp"}
          width={logoSize}
          height={logoSize}
        />
      </div>
    );
  } else if (logo === "Telegram") {
    return (
      <div>
        <Image
          src={
            "https://momants-dashboard.ams3.cdn.digitaloceanspaces.com/telegram.svg"
          }
          alt={"telegram"}
          width={logoSize}
          height={logoSize}
        />
      </div>
    );
  } else if (logo === "Instagram") {
    return (
      <div>
        <Image
          src={
            "https://momants-dashboard.ams3.cdn.digitaloceanspaces.com/instagram-icon.svg"
          }
          alt={"instagram"}
          width={logoSize}
          height={logoSize}
        />
      </div>
    );
  } else if (logo === "Freshdesk") {
    return (
      <Image
        src={
          "https://momants-dashboard.ams3.cdn.digitaloceanspaces.com/freshdesk-icon.svg"
        }
        alt={"freshdesk"}
        width={logoSize}
        height={logoSize}
      />
    );
  } else if (logo === "Facebook Messenger") {
    return (
      <Image
        src={
          "https://momants-dashboard.ams3.cdn.digitaloceanspaces.com/facebook-messenger.svg"
        }
        alt={"facebook messenger"}
        width={logoSize}
        height={logoSize}
        style={{ filter: "grayscale(100%)" }}
      />
    );
  } else {
    return (
      <BotMessageSquare
        size={logoSize - 3}
        color={"#151515"}
      />
    );
  }
};
