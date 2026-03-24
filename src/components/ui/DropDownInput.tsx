import { useState, ReactNode } from "react";
import * as Select from "@radix-ui/react-select";
import { ChevronDown } from "lucide-react";

interface DropdownInputProps {
  labelText: string;
  setSelectedItem: (value: string) => void;
  selectedItem: string;
  children: ReactNode;
  placeholder: string;
}

export const DropdownInput = ({
  setSelectedItem,
  selectedItem,
  labelText,
  children,
  placeholder,
}: DropdownInputProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <label className="momants-light-small-black mb-1">{labelText}</label>
      <Select.Root
        onOpenChange={setIsOpen}
        value={selectedItem}
        onValueChange={setSelectedItem}
      >
        <Select.Trigger className="momants-light-small-darkgray relative w-full text-left border border-gray-200 rounded-md px-3 py-2 bg-white hover:bg-gray-50">
          <Select.Value placeholder={placeholder} />
          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-500 pointer-events-none">
            <ChevronDown
              className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
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
              {children}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </>
  );
};
