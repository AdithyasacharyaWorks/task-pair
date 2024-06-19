import { User, getServerSession } from 'next-auth'

export const getUserSession = async () => {
  const authUserSession = await getServerSession()
  return authUserSession?.user
}