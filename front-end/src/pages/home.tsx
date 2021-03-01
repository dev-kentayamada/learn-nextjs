import { Box, Button } from '@material-ui/core';
import { useRouter } from 'next/router';
import React from 'react';
import Cookie from 'universal-cookie';
import { Layout } from '../components/Layout';
import { NextLinkComposed } from '../components/Link';

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
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 'inherit',
          }}
        >
          <Box
            sx={{
              width: '50%',
              '&>*': {
                paddingTop: '1rem',
              },
            }}
          >
            <Box width={1}>
              <Button
                fullWidth
                variant="contained"
                component={NextLinkComposed}
                to={{
                  pathname: '/blog',
                }}
              >
                visit blog
              </Button>
            </Box>
            <Box width={1}>
              <Button
                fullWidth
                variant="contained"
                component={NextLinkComposed}
                to={{
                  pathname: '/task',
                }}
              >
                visit task
              </Button>
            </Box>
            <Box width={1}>
              <Button fullWidth variant="contained" onClick={logout}>
                Logout
              </Button>
            </Box>
          </Box>
        </Box>
      </Layout>
    </>
  );
}
