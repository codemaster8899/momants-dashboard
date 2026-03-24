import Image from "next/image";

export const LogoHeader = () => {
  return (
    <div className="absolute top-4 left-4 flex items-center gap-2">
      <Image
        src="https://momants-dashboard.ams3.cdn.digitaloceanspaces.com/momants-square-logo.svg"
        alt="momants-logo"
        width={23.25}
        height={24}
      />
      <Image
        src="https://momants-dashboard.ams3.cdn.digitaloceanspaces.com/momants-text-logo.svg"
        alt="momants-logo"
        width={129.29}
        height={17.96}
      />
    </div>
  );
}