import { getSession } from "next-auth/react";

export default async function task() {
    // Fetch the current session
    const session = await getSession();

    if (!session || !session.user || !session.user.email) {
        throw new Error("User is not logged in or email is not available");
    }

    const email = session.user.email;

    // Fetch tasks using the email of the logged-in user
    const response = await fetch(`http://localhost:3000/api/task?email=${email}`, { cache: 'no-store' });

    if (!response.ok) {
        throw new Error("Failed to fetch tasks");
    }

    return  response
}
