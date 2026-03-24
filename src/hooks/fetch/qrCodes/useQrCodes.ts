import type {
  IQrCodeModal,
  IQrCodeResponse,
  IUseGetQrCodes,
} from "@/app/(dashboard)/qrcodes/types";
import { API } from "@/lib/api";
import { useMutation, useQuery } from "@tanstack/react-query";

const getQrApi = async (
  endpoint: string,
  agentId?: string,
  method: string = "GET",
  data?: IQrCodeModal,
) => {
  if (!agentId) throw new Error("Agent ID is required");
  try {
    const res = await API(`/dashboard${endpoint}?agent_id=${agentId}`, {
      method,
      body: data ? JSON.stringify(data) : undefined,
    });
    if (!res.ok) throw new Error(`Failed to ${method} training data`);
    return res.json();
  } catch (error) {
    throw new Error(
      `Error during ${method} training data: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
};

const getQrCodes = ({ agentId }: IUseGetQrCodes): Promise<IQrCodeResponse> =>
  getQrApi("/qr_codes", agentId);

const createQrCode = (body: IQrCodeModal, agentId?: string) =>
  getQrApi("/qr_code/create", agentId, "POST", body);

const updateQrCode = (id: string, body: IQrCodeModal, agentId?: string) =>
  getQrApi(`/qr_code/${id}`, agentId, "PUT", body);

const deleteQrCode = (id: string, agentId?: string) =>
  getQrApi(`/qr_code/${id}`, agentId, "DELETE");

const useGetQrCodes = ({ agentId }: IUseGetQrCodes) =>
  useQuery({
    queryKey: ["QR", "qrCodes", agentId],
    queryFn: () => getQrCodes({ agentId }),
  });

const useCreateQrCode = ({ agentId }: IUseGetQrCodes) =>
  useMutation({
    mutationKey: ["QR", "createQrCode", agentId],
    mutationFn: (body: IQrCodeModal) => createQrCode(body, agentId),
  });

const useUpdateQrCode = ({ agentId }: IUseGetQrCodes) =>
  useMutation({
    mutationKey: ["QR", "updateQrCode", agentId],
    mutationFn: ({ id, body }: { id: string; body: IQrCodeModal }) =>
      updateQrCode(id, body, agentId),
  });

const useDeleteQrCode = ({ agentId }: IUseGetQrCodes) =>
  useMutation({
    mutationKey: ["QR", "deleteQrCode", agentId],
    mutationFn: (id: string) => deleteQrCode(id, agentId),
  });

export { useGetQrCodes, useCreateQrCode, useUpdateQrCode, useDeleteQrCode };
