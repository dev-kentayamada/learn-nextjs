import { Box } from '@material-ui/core'
import Head from 'next/head'
import Image from 'next/image'
import React, { ReactNode } from 'react'
import Link from './Link'

type Props = {
  children: ReactNode
  title: string
}

export const Layout = ({
  children,
  title = 'This is the default title'
}: Props): JSX.Element => (
  <>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Box
      sx={{
        minHeight: '5vh',
        backgroundColor: '#fafafa',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex'
      }}
    >
      <Box>
        The source code for this blog is{' '}
        <Link
          sx={{ color: 'black', textDecoration: 'underline' }}
          href={'https://github.com/dev-kentayamada/learn-nextjs'}
        >
          available on GitHub
        </Link>
        .
      </Box>
    </Box>
    <Box sx={{ minHeight: '85vh' }}>{children}</Box>
    <Box
      sx={{
        minHeight: '10vh',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        backgroundColor: '#fafafa'
      }}
    >
      <Link
        sx={{
          color: 'black',
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex'
        }}
        underline="none"
        href={'https://vercel.com/'}
      >
        Powered by{' '}
        <Image
          src="/vercel.svg"
          alt="Picture of vercel"
          width={100}
          height={20}
        />
      </Link>
    </Box>
  </>
)
