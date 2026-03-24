import { InteractiveButtonMessagePayload } from "../../../../../../types/InteractiveMessage";
import { InteractiveHeader } from "./InteractiveHeader";

type InteractiveHeaderProps = {
  header: NonNullable<InteractiveButtonMessagePayload["header"]>;
};

export const StyledHeader = ({ header }: InteractiveHeaderProps) => {
  return (
    <div className="pt-1 px-1 rounded-lg bg-gray-100 font-sora font-semibold text-[16px] text-left">
      <InteractiveHeader header={header} />
    </div>
  );
};
