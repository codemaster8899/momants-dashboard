import Image from "next/image";

export const PhotoSection = () => {
    return (
        <div className="relative w-1/2 h-screen bg-[#151515]">
          <Image
            src="https://momants-dashboard.ams3.cdn.digitaloceanspaces.com/momants-login-image.png"
            alt="momants"
            width={600}
            height={800}
            className="mt-20 ml-20"
          />
          <h1 className="text-5xl text-white font-semibold absolute bottom-10 left-10 mb-6">
            Turn conversations into conversations.
          </h1>
        </div>
    )
}