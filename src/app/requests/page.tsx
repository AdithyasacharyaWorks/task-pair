

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import CardHoverEffect from "./CardHoverEffect";
import Loader from "@/components/custom/Loader"; // Assuming the path to Loader component
import axios from "axios";
import Requestclient from "./Requestclient";
import { getUserSession } from "@/lib/session";


// Define the types for the data we are working with

const RequestsPage =async () => {

  const user = await getUserSession()

  return (
    <div >
      <Requestclient userEmail={user?.email||""}/>
    </div>
  );
};

export default RequestsPage;
