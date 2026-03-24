"use client";

import { useLogout } from "@/hooks/fetch/auth/useLogout";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { createPortal } from "react-dom";

export const LogoutPopup = () => {
	const router = useRouter();
	const { logout } = useLogout();

	useEffect(() => {
		const doLogout = async () => {
			try {
				await logout();
			} catch (err) {
				console.error("Logout failed:", err);
			}
		};
		doLogout();
	}, [logout]);

	return createPortal(
		<div className="fixed inset-0 flex items-center justify-center bg-black/30 z-[9999]">
			<div className="bg-white border rounded-lg shadow-sm w-[600px] p-6">
				<h2 className="font-sans momants-semibold-mediumlarge-black">
					You have successfully logged out
				</h2>
				<p className="sub-title mt-2 momants-light-small-gray">
					You can now safely close this window.
				</p>
				<div className="flex justify-between mt-6">
					<button
						onClick={() => router.push("/")}
						className="momants-light-small-white px-4 py-2 rounded-full bg-black hover:bg-gray-800">
						Back to Login
					</button>
				</div>
			</div>
		</div>,
		document.body,
	);
};
