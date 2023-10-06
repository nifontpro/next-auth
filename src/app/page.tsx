import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { options } from './api/auth/[...nextauth]/options';
import SignOut from '@/ui/SignOut/SignOut';
import SignIn from '@/ui/SignIn/SignIn';
import { useSession } from 'next-auth/react';
import TestComponent from '@/ui/TestComponent/TestComponent';

export default async function HomePage() {
  const session = await getServerSession(options);

  console.log(session);

  return (
    <>
      {session ? <SignOut /> : <SignIn />}
      <main>
        Main page
        <Link href='/users'>Страница сотрудников</Link>
      </main>
      {session ? (
        <div>
          Вы зарегестрированы
          <p>{session.user?.name}</p>
        </div>
      ) : (
        <div>Вы не зарегестрированы</div>
      )}
      <TestComponent />
    </>
  );
}
