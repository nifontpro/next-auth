'use client';

import { useSession } from 'next-auth/react';
import React from 'react';

const TestComponent = () => {
  const { status, data: session } = useSession();

  if (status === 'loading') {
    return <div>Loading</div>;
  }
  if (status === 'authenticated') {
    return <div>{session.user!.name}</div>;
  }
  if (status === 'unauthenticated') {
    return <div>unauthenticated</div>;
  }

  return <div>TestComponent</div>;
};

export default TestComponent;
