import {getAllUsers} from "@/app/api/getAllUsers";

export const dynamic = 'force-dynamic' // SSR

// https://www.youtube.com/watch?v=iOu3Iarbh9k
// https://dev.to/farisdurrani/keycloak-auth-on-nextjs-134-using-nextauth-57e0
export default async function UsersPage() {

  const allUsers = await getAllUsers()

  return <div>
    {
      allUsers.map(user=> (
          <div key={user.id}>
            {user.firstname}
          </div>
      ))
    }
  </div>
}