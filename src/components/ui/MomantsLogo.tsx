import Image from "next/image";

interface MomantsLogoProps {
    width: number;
    height: number;
    className: string;
}


export const MomantsLogo = ({width, height, className}: MomantsLogoProps) => {
    return (
      <Image
        src="https://momants-dashboard.ams3.cdn.digitaloceanspaces.com/momants-black-logo.svg"
        alt="momants black logo"
        width={width}
        height={height}
        className={className}
      />
    );

}
