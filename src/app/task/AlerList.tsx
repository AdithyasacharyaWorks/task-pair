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
    <Alert variant="positive">
      {type === "success" ? <MdFileDownloadDone /> : <FcCancel />}
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};
