import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MdFileDownloadDone } from "react-icons/md";
import { FcCancel } from "react-icons/fc";

import { useState } from "react";

enum VariantTypes {
  Success = 'success|positve',
  Failure = 'failure|destructive'
}

const AlerList = ({
  type,
  message,
}: {
  type: string;
  message: string;
}) => {

  // const [varient] = useState<VariantTypes>(type==="success"?"positive":"destructive")
  return (
    <Alert variant={"default"} className="flex items-center">
      {type === "success" ? <MdFileDownloadDone /> : <FcCancel />}
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};


export default AlerList;