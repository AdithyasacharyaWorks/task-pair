import { getUserSession } from "@/lib/session";
import DetailPage from "./DetailPage";


const TaskDetails =async ({ params }: any) => {
  const userData = await getUserSession()
  return (
   <DetailPage params={params} userData={userData}/>
  );
};

export default TaskDetails;
