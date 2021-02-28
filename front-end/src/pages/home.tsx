import { Button } from '@material-ui/core';
import { useRouter } from 'next/router';
import React from 'react';
import Cookie from 'universal-cookie';
import { Layout } from '../components/Layout';

const cookie = new Cookie();

export default function Home(): JSX.Element {
  const router = useRouter();
  const logout = () => {
    cookie.remove('access_token');
    router.push('/');
  };
  return (
    <>
      <Layout title="home">
        Home
        <Button onClick={logout}>logout</Button>
      </Layout>
    </>
  );
}
