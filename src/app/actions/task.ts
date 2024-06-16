export default async function task(email:string) {
    return await fetch(`http://localhost:3000/api/task?email=${email}`,{cache:'no-store'})
}