"use client";

import { InformationPopup } from "@/components/Layout/InformationPopup";
import { Popup } from "@/components/Layout/Popup";
import { DropdownInput } from "@/components/ui/DropDownInput";
import * as Select from "@radix-ui/react-select";
import { ChevronDown, Plus, X } from "lucide-react";
import React, { useState } from "react";
import type { ITemplateBody, TButton, TemplateResponse } from "../types";
import { MessageExample } from "./messageExample";

type CreateTemplatePopupProps = {
  data?: TemplateResponse | null;
  onConfirm: (body: ITemplateBody) => void;
  onCancel: () => void;
};

export const CreateTemplatePopup = ({
  data,
  onConfirm,
  onCancel,
}: CreateTemplatePopupProps) => {
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState(data?.categories?.[0]?.value ?? "");
  const [language, setLanguage] = useState(data?.languages?.[0]?.value ?? "");
  const [buttons, setButtons] = useState<TButton[]>([]);
  const [langIsOpen, setLangIsOpen] = useState(false);
  const [messagePlatform, setMessagePlatform] = useState(
    data?.message_platforms?.[0]?.value ?? "",
  );
  const [conformationPopup, setConformationPopup] = useState(false);

  const handleReceived = () => {
    setConformationPopup(false);
  };

  const handleConfirm = async () => {
    await onConfirm({
      template_name: name,
      message_platform: messagePlatform,
      language,
      category,
      body_text: body,
      buttons,
    });
    setConformationPopup(true);
  };

  const addButton = (): void => {
    setButtons((prev) => [...prev, { type: "text", text: "" }]);
  };

  const updateButton = (idx: number, text: string): void => {
    setButtons((prev) => {
      const updated = [...prev];
      updated[idx] = { ...updated[idx], text };
      return updated;
    });
  };

  const removeButton = (idx: number): void => {
    setButtons((prev) => prev.filter((_, index) => index !== idx));
  };

  const handleSetName = (newString: string) => {
    newString = newString.replace(" ", "_");
    newString = newString.toLowerCase();
    setName(newString);
  };

  return (
    <>
      {!conformationPopup && (
        <Popup onClose={onCancel}>
          <div className="bg-white border rounded-lg shadow-sm flex flex-col w-[600px] p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="font-sans momants-semibold-large-black mt-6">
              Create template
            </h2>

            {/* message platform */}
            <div className="mt-2">
              <DropdownInput
                labelText={"Message platform"}
                setSelectedItem={setMessagePlatform}
                selectedItem={messagePlatform}
                placeholder={"Select a platform"}
              >
                {data?.message_platforms?.map(({ display_name, value }) => (
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

            {/* name input */}
            <div className="relative my-4 w-full">
              <label className="momants-light-small-black">Name</label>
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  maxLength={15}
                  onChange={(e) => handleSetName(e.target.value)}
                  placeholder="Enter a name"
                  className="w-full border rounded-md px-3 py-2 pr-12 momants-light-small-darkgray focus:outline-none focus:ring-2 focus:ring-black"
                />

                {/* Counter overlay */}
                <span className="absolute inset-y-0 right-3 flex items-center text-xs text-gray-500 pointer-events-none">
                  {name.length}/15
                </span>
              </div>
            </div>

            {/* category input */}
            <div className="">
              <DropdownInput
                labelText={"Category"}
                setSelectedItem={setCategory}
                selectedItem={category}
                placeholder={"Select a category"}
              >
                {data?.categories?.map(({ display_name, value }) => (
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

            {/* language input */}
            <label className="mt-4 momants-light-small-black mb-1">
              Language
            </label>
            <Select.Root
              value={language}
              onValueChange={(code) => {
                setLanguage(code);
              }}
              onOpenChange={setLangIsOpen}
            >
              <Select.Trigger className="w-full relative momants-light-small-darkgray text-left border border-gray-200 rounded-md px-3 py-2 bg-white hover:bg-gray-50">
                <Select.Value placeholder="Select a language" />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-500 pointer-events-none">
                  <ChevronDown
                    className={`transition-transform ${langIsOpen ? "rotate-180" : ""}`}
                  />
                </span>
              </Select.Trigger>

              <Select.Portal>
                <Select.Content
                  className="w-[var(--radix-select-trigger-width)] momants-light-small-darkgray bg-white shadow-lg rounded-md border border-gray-200 p-1 z-[9999]"
                  position="popper"
                  sideOffset={4}
                >
                  <Select.Viewport className="h-auto max-h-64 overflow-y-auto">
                    {data?.languages?.map(({ display_name, value }) => (
                      <Select.Item
                        key={value}
                        value={value}
                        className="px-3 py-2 hover:bg-gray-100 rounded-md cursor-pointer"
                      >
                        <Select.ItemText>{display_name}</Select.ItemText>
                      </Select.Item>
                    ))}
                  </Select.Viewport>
                </Select.Content>
              </Select.Portal>
            </Select.Root>

            {/* Body input */}
            <div className="relative mt-4">
              <label className="mt-4 momants-light-small-black">Body</label>
              <textarea
                value={body}
                maxLength={200}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Add your message"
                rows={3}
                className="my-1 w-full border rounded-md px-3 py-2 momants-light-small-darkgray focus:outline-none focus:ring-2 focus:ring-black resize-none min-h-[4rem]"
              />

              {/* Counter overlay */}
              <span className="absolute last:right-4 bottom-5 flex items-center text-xs text-gray-500 pointer-events-none">
                {body.length}/200
              </span>
            </div>

            {/* message example */}
            <div className="flex-shrink-0 bg-white my-2">
              <MessageExample messageText={body} buttons={buttons} />
            </div>

            {/* button options */}
            <label className="mt-4 momants-light-small-black mb-1">
              Buttons (optional)
            </label>

            <div className="flex flex-col gap-2">
              {buttons.map((button, idx) => (
                <React.Fragment key={idx}>
                  <div className="flex items-center gap-2 relative mt-1 w-full">
                    <input
                      type="text"
                      maxLength={20}
                      value={button.text}
                      onChange={(e) => updateButton(idx, e.target.value)}
                      placeholder="Button text"
                      className="flex-1 border rounded-md px-3 py-2 pr-12 momants-light-small-darkgray focus:outline-none focus:ring-2 focus:ring-black"
                    />

                    {/* Counter overlay inside input */}
                    <span className="absolute right-10 top-1/2 -translate-y-1/2 text-xs text-gray-500 pointer-events-none">
                      {button.text.length}/20
                    </span>

                    {/* Delete button */}
                    <button
                      type="button"
                      onClick={() => removeButton(idx)}
                      className="text-black hover:text-gray-700 flex-shrink-0"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </React.Fragment>
              ))}

              {buttons.length < 3 && (
                <>
                  <button
                    type="button"
                    onClick={addButton}
                    className="w-fit mt-1 bg-gray-200 momants-light-extrasmall-darkgray px-4 py-3 hover:bg-gray-200 flex items-center gap-1 rounded-md shadow"
                  >
                    <Plus size={16} />
                    <span>Add button</span>
                  </button>
                </>
              )}
            </div>

            {/* popup buttons */}
            <div className="flex justify-between mt-6">
              <button
                onClick={onCancel}
                className="px-4 py-2 text-sm rounded-full border momants-light-small-darkgray hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 momants-light-small-white rounded-full bg-black hover:bg-gray-800 disabled:opacity-40"
                disabled={!name.trim() && !body.trim()}
              >
                Confirm
              </button>
            </div>
          </div>
        </Popup>
      )}

      {conformationPopup && (
        <InformationPopup
          closePopup={handleReceived}
          title="Template received"
          description="The template was received successfully and is currently under review by Meta."
          buttonText="Close"
        />
      )}
    </>
  );
};
