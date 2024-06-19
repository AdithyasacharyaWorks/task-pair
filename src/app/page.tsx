import { redirect } from "next/navigation";
import "./globals.css";
import { getUserSession } from "@/lib/session";
import { Button } from "@/components/ui/button";
import Dashboard from "./Dashboard";

export default async function Home() {
  const user = await getUserSession();

  const login = async () => {
    "use server";
    redirect("/api/auth/signin");
  };

  const navigateToRequests = async () => {
    "use server";
    redirect("/requests");
  };

  return (
    <main>
      {user === undefined ? (
        <div className="flex flex-col items-center justify-center   text-white p-6">
          <form action={login} className="bg-gray-800 p-8 rounded-lg shadow-lg">
            <div className="flex flex-col items-center">
              <label className="mb-4 text-xl font-semibold">
                Please sign in to continue
              </label>
              <Button
                variant="secondary"
                type="submit"
                className="px-6 py-3 text-lg"
              >
                Sign in
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <div className="px-5">
          <div className="rounded-lg   flex flex-col  ">
            <div className="mb-4">
              <img
                src={user?.image || ""}
                alt="User image"
                className="rounded-full w-24 h-24 mt-4 border-4 border-gray-700"
              />
              <div className=" font-thin text-2xl">Hello {user?.name}!</div>
              <div className="text-gray-400 font-thin text-sm">
                {user?.email}
              </div>
            </div>
          </div>
          <div >
            <Dashboard />
          </div>
        </div>
      )}
    </main>
  );
}
