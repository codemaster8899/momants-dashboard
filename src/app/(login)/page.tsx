"use client";
import { useConversationsMemberStore } from "@/stores/data/useConversationsMemberStore";
import { useMeStore } from "@/stores/data/useMeStore";
import Image from "next/image";
import { useEffect } from "react";
import { FormSection } from "./components/FormSection";
import { LogoHeader } from "./components/LogoHeader";

export default function LoginPage() {
	// delete all user info in zustand stores on
	// login page to prevent local storage data leaks
	const { clear: clearMe } = useMeStore();
	const { clear: clearConversationsMember } = useConversationsMemberStore();

	useEffect(() => {
		clearMe();
		clearConversationsMember();
	}, [clearMe, clearConversationsMember]);

	return (
		<div className="h-screen w-screen relative bg-white flex p-6">
			<div className="w-[50%] flex flex-col items-center justify-center gap-6">
				{/* Logo at top-left */}
				<LogoHeader />

				{/* Right side - Empty for now (future login form) */}
				<FormSection />
			</div>

			{/* Left side - Full height image */}
			<div className="flex relative w-[50%] justify-center h-auto bg-[#151515] rounded-xl">
				<Image
					src="https://momants-dashboard.ams3.cdn.digitaloceanspaces.com/momants-login-image.png"
					alt="momants"
					width={600}
					height={800}
					sizes="(max-width: 1024px) 40vw, 600px"
					className="
            md:mt-20
            h-auto
            max-h-[70vh]
            md:max-h-[60vh]
            lg:max-h-[55vh]
            w-auto
          "
					priority
				/>

				<h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-white font-[500] absolute bottom-14 left-10">
					Turn conversations into conversions.
				</h1>
			</div>
		</div>
	);
}
