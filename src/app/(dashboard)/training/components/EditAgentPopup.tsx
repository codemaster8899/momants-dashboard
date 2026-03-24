"use client";

import { Popup } from "@/components/Layout/Popup";
import { Pencil } from "lucide-react";
import { useRef, useState } from "react";

type EditAgentPopupProps = {
  onConfirm: (
    question: string,
    answer: string,
    persona: string,
    avatar?: string,
  ) => void;
  onCancel: () => void;
};

export const EditAgentPopup = ({
  onConfirm,
  onCancel,
}: EditAgentPopupProps) => {
  const [name, setName] = useState("");
  const [persona, setPersona] = useState("");
  const [toneOfVoice, setToneOfVoice] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null); // stores the selected image URL

  const inputRef = useRef<HTMLInputElement>(null);

  const handleConfirm = () => {
    onConfirm(name, toneOfVoice, persona, avatar || undefined);
  };

  const openFileExplorer = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setAvatar(ev.target?.result as string);
      };
      reader.readAsDataURL(file); // convert image to base64 URL
    }
  };

  return (
    <Popup onClose={onCancel}>
      <div className="bg-white border rounded-lg shadow-sm flex flex-col w-[600px] p-6 max-h-[83.333vh] overflow-y-auto">
        <h2 className="font-sans momants-semibold-large-black">
          Edit your AI Agent
        </h2>

        <button
          onClick={openFileExplorer}
          className="relative w-16 h-16 rounded-full mt-4 flex items-center justify-center
            bg-center bg-cover bg-no-repeat hover:cursor-pointer
            before:absolute before:inset-0 before:bg-black/50 hover:before:bg-black/40 before:rounded-full before:z-0"
          style={{
            backgroundImage: `url(${avatar || "https://momants-dashboard.ams3.cdn.digitaloceanspaces.com/momants-black-logo.svg"})`,
          }}
        >
          <Pencil className="w-5 text-white relative z-10" />
        </button>

        <input
          type="file"
          ref={inputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />

        <label className="mt-4 momants-light-small-black">Agent name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your agent's name"
          className="mt-1 w-full border rounded-md px-3 py-2 momants-light-small-darkgray focus:outline-none focus:ring-2 focus:ring-black resize-none"
        />

        <label className="mt-4 momants-light-small-black">Persona</label>
        <input
          type="text"
          value={persona}
          onChange={(e) => setPersona(e.target.value)}
          placeholder="Your agent's persona"
          className="mt-1 w-full border rounded-md px-3 py-2 momants-light-small-darkgray focus:outline-none focus:ring-2 focus:ring-black resize-none"
        />

        <label className="mt-4 momants-light-small-black">Tone of voice</label>
        <textarea
          value={toneOfVoice}
          onChange={(e) => setToneOfVoice(e.target.value)}
          placeholder="Your agent's tone of voice"
          className="mt-1 w-full border rounded-md px-3 py-2 momants-light-small-darkgray focus:outline-none focus:ring-2 focus:ring-black resize-none"
          rows={2}
        />

        <div className="flex justify-between mt-6">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onCancel();
            }}
            className="px-4 py-2 momants-light-small-black rounded-full border border-gray-300 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleConfirm();
            }}
            className="px-4 py-2 momants-light-small-white rounded-full bg-black hover:bg-gray-800 disabled:opacity-40"
            disabled={!name.trim()}
          >
            Confirm
          </button>
        </div>
      </div>
    </Popup>
  );
};
