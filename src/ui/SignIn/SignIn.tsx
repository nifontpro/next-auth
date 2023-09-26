'use client';
import { signIn } from 'next-auth/react';
import React from 'react';

const SignIn = () => {
  return <button onClick={() => signIn()}>Войти</button>;
};

export default SignIn;
