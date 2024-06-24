import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MdFileDownloadDone } from "react-icons/md";
import { FcCancel } from "react-icons/fc";

export const AlerList = ({
  type,
  message,
}: {
  type: string;
  message: string;
}) => {
  return (
    <Alert variant="positive" className="flex justify-center items-center">
      <span>{type === "success" ? <MdFileDownloadDone /> : <FcCancel />}</span>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};
