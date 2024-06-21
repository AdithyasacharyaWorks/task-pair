import { getUserSession } from "@/lib/session";
import DetailPage from "./detailPage";


const TaskDetails =async ({ params }: any) => {
  const userData = await getUserSession()
  return (
   <DetailPage params={params} userData={userData}/>
  );
};

export default TaskDetails;
