import { Box } from '@material-ui/core';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import React from 'react';
import { Layout } from '../../components/Layout';

type Blog = {
  id: string;
  title: string;
  content: string;
  created_at: string;
};

type Props = {
  blog: Blog;
};

export const getServerSideProps: GetServerSideProps<Props, Blog> = async ({ params }) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/detail-post/${params?.id}/`);
  if (res.status === 404) {
    return {
      redirect: {
        destination: '/blogs',
        permanent: false,
      },
    };
  }
  const blog: Blog = await res.json();

  return {
    props: {
      blog,
    },
  };
};

export default function BlogPage({ blog }: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  return (
    <>
      <Layout title={blog.title}>
        <Box>{blog.content}</Box>
      </Layout>
    </>
  );
}
