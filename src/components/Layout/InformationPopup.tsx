"use client";

import { Popup } from "./Popup";

interface InformationPopupProps {
  closePopup: () => void;
  title: string;
  description: string;
  buttonText: string;
}

export const InformationPopup = ({
  closePopup,
  title,
  description,
  buttonText,
}: InformationPopupProps) => {
  return (
    <Popup onClose={closePopup}>
      <div className="bg-white border rounded-lg shadow-sm w-[600px] p-6">
        <h2 className="font-sans momants-semibold-mediumlarge-black">
          {title}
        </h2>
        <p className="sub-title mt-2 momants-light-small-gray">{description}</p>
        <div className="flex justify-end mt-6">
          <button
            onClick={closePopup}
            className="momants-light-small-white px-4 py-2 rounded-full bg-black hover:bg-gray-800"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </Popup>
  );
};
