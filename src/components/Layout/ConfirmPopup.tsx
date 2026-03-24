type ConfirmPopupProps = {
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export const ConfirmPopup = ({
  title,
  description,
  onConfirm,
  onCancel,
}: ConfirmPopupProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
      <div className="bg-white border rounded-lg shadow-sm flex flex-col w-[600px] p-6">
        <h2 className="font-sans momants-semibold-mediumlarge-black">
          {title}
        </h2>
        <p className="sub-title mt-2 momants-light-small-gray">{description}</p>
        <div className="flex justify-between mt-6">
          <button
            onClick={onCancel}
            className="px-4 py-2 momants-light-small-darkgray rounded-full !border !border-solid !border-[#E4E4E7] hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="momants-light-small-white px-4 py-2 rounded-full bg-black hover:bg-gray-800 disabled:opacity-40"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};
