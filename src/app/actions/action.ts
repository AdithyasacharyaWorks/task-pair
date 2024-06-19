import { getUserSession } from '@/lib/session';
export default async function (){
    const user = await getUserSession();
    return user
}