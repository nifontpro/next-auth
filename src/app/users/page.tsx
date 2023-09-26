import { getServerSession } from 'next-auth';
import { options } from '../api/auth/[...nextauth]/options';
import Link from 'next/link';

export default async function UsersPage() {
  const session = await getServerSession(options);

  console.log(session);

  if (!session) {
    return (
      <main>
        Вы не зарегестрированы
        <Link href='/'>На главную</Link>
      </main>
    );
  } else {
    return (
      <main>
        Вы зарегестрированы
        <Link href='/'>На главную</Link>
      </main>
    );
  }
}
