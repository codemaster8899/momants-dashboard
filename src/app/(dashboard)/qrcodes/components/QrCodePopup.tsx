"use client";

import { Popup } from "@/components/Layout/Popup";
import { DropdownInput } from "@/components/ui/DropDownInput";
import { useState } from "react";
import { PrefilledInputTextExample } from "./PrefilledInputTextExample";

import * as Select from "@radix-ui/react-select";
import type { IQrCodeModal, IQrCodes, IQrCodesCategories } from "../types";

type QrCodePopupProps = {
  editData: IQrCodes | null;
  isLoading: boolean;
  categories?: IQrCodesCategories[];
  onConfirm: (type: "create" | "edit", body: IQrCodeModal) => void;
  onCancel: () => void;
};

export const QrCodePopup = ({
  editData,
  isLoading,
  categories = [],
  onConfirm,
  onCancel,
}: QrCodePopupProps) => {
  const [name, setName] = useState(editData?.name ?? "");
  const [preFilledText, setPreFilledText] = useState(
    editData?.initial_message ?? "",
  );
  const [platform, setPlatform] = useState(editData?.message_platform ?? "");

  const handleConfirm = () => {
    const type = editData ? "edit" : "create";
    onConfirm(type, {
      name,
      initial_message: preFilledText,
      message_platform: platform,
      is_active: editData?.is_active ?? true,
    });
  };

  return (
    <Popup onClose={onCancel}>
      <div className="bg-white border rounded-lg shadow-sm flex flex-col w-[600px] p-6 pt-10 max-h-[83.333vh] overflow-y-auto">
        <PrefilledInputTextExample prefilledText={preFilledText} />

        <h2 className="font-sans momants-semibold-large-black mt-6">
          {editData ? "Edit QR Code" : "Create QR Code"}
        </h2>

        {/* template */}
        <div className="mt-4">
          <DropdownInput
            labelText={"Message platform"}
            setSelectedItem={setPlatform}
            selectedItem={platform}
            placeholder={"Select a template"}
          >
            {categories.map(({ value, display_name }) => (
              <Select.Item
                key={value}
                value={value}
                className="px-3 py-2 hover:bg-gray-100 rounded-md cursor-pointer"
              >
                <Select.ItemText>{display_name}</Select.ItemText>
              </Select.Item>
            ))}
          </DropdownInput>
        </div>

        <label className="mt-4 momants-light-small-black">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter QR code name"
          className="mt-1 w-full border rounded-md px-3 momants-light-small-darkgray py-2 focus:outline-none focus:ring-2 focus:ring-black"
        />

        <div className="relative">
          <label className="mt-4 momants-light-small-black">
            Initial message
          </label>
          <input
            type="text"
            maxLength={250}
            value={preFilledText}
            onChange={(e) => setPreFilledText(e.target.value)}
            placeholder="Optional initial message"
            className="mt-1 w-full border rounded-md px-3 py-2 pr-16 momants-light-small-darkgray focus:outline-none focus:ring-2 focus:ring-black"
          />
          <span className="absolute last:right-4 bottom-3 flex items-center text-xs text-gray-500 pointer-events-none">
            {preFilledText.length}/250
          </span>
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm rounded-full border momants-light-small-darkgray hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 rounded-full bg-black momants-light-small-white hover:bg-gray-800 disabled:opacity-40"
            disabled={!name.trim() || !platform.trim() || isLoading}
          >
            Confirm
          </button>
        </div>
      </div>
    </Popup>
  );
};
