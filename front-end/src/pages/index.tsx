import { Box, Button } from '@material-ui/core';
import { useRouter } from 'next/router';
import React from 'react';
import Cookie from 'universal-cookie';
import { Layout } from '../components/Layout';
import { NextLinkComposed } from '../components/Link';

const cookie = new Cookie();

export default function Home(): JSX.Element {
  const router = useRouter();

  return (
    <>
      <Layout title="Home">
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
                  pathname: '/blogs',
                }}
              >
                see Blogs
              </Button>
            </Box>
            <Box width={1}>
              <Button
                fullWidth
                variant="contained"
                component={NextLinkComposed}
                to={{
                  pathname: '/tasks',
                }}
              >
                See Tasks
              </Button>
            </Box>
            <Box width={1}>
              <Button
                fullWidth
                variant="contained"
                onClick={
                  cookie.get('access_token')
                    ? () => {
                        cookie.remove('access_token');
                        router.push('/');
                      }
                    : () => router.push('/auth')
                }
              >
                {cookie.get('access_token') ? 'Logout' : 'Login/Signup'}
              </Button>
            </Box>
          </Box>
        </Box>
      </Layout>
    </>
  );
}
