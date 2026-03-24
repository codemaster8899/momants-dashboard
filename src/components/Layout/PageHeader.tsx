"use client";

import { Info, Pencil } from "lucide-react";
import { NewButton } from "../ui/NewButton";

interface HeaderProps {
	title: string;
	description: string;
	informationText?: string | null;
	buttonText?: string;
	imageSource?: string;
	ExtraMainClassName?: string;
	onNew?: () => void;
	onEdit?: () => void;
}

export const PageHeader = ({
	title,
	description,
	informationText,
	buttonText,
	imageSource,
	ExtraMainClassName,
	onNew,
	onEdit,
}: HeaderProps) => {
	return (
		<div
			className={`mb-4 mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between ${ExtraMainClassName}`}>
			{/* Avatar + Title and description */}
			<div className="flex items-center gap-3">
				{imageSource && (
					<img src={imageSource} alt="Avatar" className="w-12 h-12 rounded-full object-contain" />
				)}

				<div>
					<h1 className="flex items-baseline gap-2 font-semibold text-2xl">
						{title}

						{onEdit && (
							<Pencil
								onClick={onEdit}
								size={18}
								className="stroke-gray-500 hover:cursor-pointer hover:stroke-black"
							/>
						)}

						{informationText && (
							<span className="relative group">
								<Info className="w-5 text-gray-400" />

								{/* Tooltip */}
								<span className="pointer-events-none absolute left-1/2 top-full z-50 mt-2 w-max -translate-x-1/2 rounded-md bg-black px-3 py-1 momants-light-small-white opacity-0 transition-opacity group-hover:opacity-100">
									{informationText}
								</span>
							</span>
						)}
					</h1>

					{description && <p className="momants-light-medium-gray">{description}</p>}
				</div>
			</div>

			{/* Button aligned to the right */}
			{buttonText && onNew && (
				<div className="mt-2 sm:mt-0 sm:ml-4 flex items-end">
					<NewButton buttonText={buttonText} onClick={onNew} />
				</div>
			)}
		</div>
	);
};
