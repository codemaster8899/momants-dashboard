"use client";

import { PageHeader } from "@/components/Layout/PageHeader";
import PageWrapper from "@/components/Layout/PageWrapper";
import { useState } from "react";
import { QrCodePopup } from "./components/QrCodePopup";
import { QrCodeCard } from "./components/QrcodeCard";
import { downloadQrCode } from "./functions";
import {
  useCreateQrCode,
  useDeleteQrCode,
  useGetQrCodes,
  useUpdateQrCode,
} from "@/hooks/fetch/qrCodes/useQrCodes";
import { useMeStore } from "@/stores/data/useMeStore";
import { IQrCodeModal, IQrCodes } from "./types";
import EmptyState from "@/components/shared/EmptyState";
import ErrorState from "@/components/shared/ErrorState";
import LoadingState from "@/components/shared/LoadingState";
import { QrCode } from "lucide-react";

export default function Page() {
  const { currentAgent } = useMeStore();
  const agentId = currentAgent?.id;
  const { data, isSuccess, isLoading, isError, refetch } = useGetQrCodes({
    agentId,
  });
  const { mutateAsync: createQrCode, isPending: isCreating } = useCreateQrCode({
    agentId,
  });
  const { mutateAsync: updateQrCode, isPending: isUpdating } = useUpdateQrCode({
    agentId,
  });
  const { mutateAsync: deleteQrCode } = useDeleteQrCode({ agentId });

  const [openNewQrCodePopup, setOpenNewQrCodePopup] = useState(false);
  const [inEditQrCode, setInEditQrCode] = useState<IQrCodes | null>(null);

  const handleNewQRCode = () => {
    setOpenNewQrCodePopup(true);
  };

  const updateStatus = async (
    { qr_code_id, name, message_platform, initial_message }: IQrCodes,
    is_active: boolean,
  ) => {
    await updateQrCode({
      id: qr_code_id,
      body: {
        name,
        message_platform,
        initial_message,
        is_active,
      },
    });
    await refetch();
  };

  const onEdit = (qrCode: IQrCodes) => {
    setInEditQrCode(qrCode);
    setOpenNewQrCodePopup(true);
  };

  const onCreateModalConfirm = async (
    type: "create" | "edit",
    body: IQrCodeModal,
  ) => {
    if (type === "edit" && inEditQrCode)
      await updateQrCode({ id: inEditQrCode?.qr_code_id, body });
    if (type === "create") await createQrCode(body);

    setOpenNewQrCodePopup(false);
    refetch();
  };

  const onCreateModalCancel = () => {
    setOpenNewQrCodePopup(false);
    setInEditQrCode(null);
  };

  const onDelete = async (id: string) => {
    await deleteQrCode(id);
    await refetch();
  };

  return (
    <PageWrapper className="p-6" title="QR Codes">
      {/* Title and add button */}
      <PageHeader
        title="QR Codes"
        description="Manage all your QR Codes"
        buttonText="New QR code"
        onNew={handleNewQRCode}
      />

      {/* New QR Code Popup */}
      {openNewQrCodePopup && (
        <QrCodePopup
          isLoading={isCreating || isUpdating}
          editData={inEditQrCode}
          categories={data?.message_platforms}
          onConfirm={onCreateModalConfirm}
          onCancel={onCreateModalCancel}
        />
      )}

      {/* QR Codes list */}
      <div className="flex flex-col h-full pt-4 border-t">
        {isError ? (
          <ErrorState />
        ) : isLoading ? (
          <LoadingState />
        ) : Boolean(isSuccess && data?.qr_codes?.length) ? (
          <div className="space-y-4 mt-10 h-full">
            {data?.qr_codes.map((qrCode) => (
              <QrCodeCard
                key={qrCode.qr_code_id}
                qrCode={qrCode}
                onEdit={onEdit}
                onDownload={downloadQrCode}
                onDelete={() => onDelete(qrCode.qr_code_id)}
                onToggle={(value) => updateStatus(qrCode, value)}
              />
            ))}
          </div>
        ) : (
          <EmptyState Icon={QrCode} text="Create your first QR code." onOpen={handleNewQRCode} />
        )}
      </div>
    </PageWrapper>
  );
}
