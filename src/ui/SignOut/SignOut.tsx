'use client';
import { signOut } from 'next-auth/react';
import React from 'react';

const ExitBtn = () => {
  return <button onClick={() => signOut()}>Выйти</button>;
};

export default ExitBtn;
