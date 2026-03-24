import Image from "next/image";

export default function MobileNotSupported() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white">
      <div className="p-10 m-10 rounded-xl shadow-lg border-2 border-gray-200 bg-white max-w-md w-full text-center">
        <div className="flex flex-col items-center gap-4 mb-6">
          <Image
            src="https://momants-dashboard.ams3.cdn.digitaloceanspaces.com/momants-square-logo.svg"
            alt="Momants Square Logo"
            width={80}
            height={80}
            priority
          />
        </div>

        <h1 className="tracking-tight text-[#09090B] text-3xl font-bold">
          Oops! Not available on mobile
        </h1>
        <p className="sub-title mt-2 text-gray-700">
          Looks like you&apos;re on a mobile device. For the full experience,
          please open this page on a desktop or laptop.
        </p>
      </div>
    </div>
  );
};
