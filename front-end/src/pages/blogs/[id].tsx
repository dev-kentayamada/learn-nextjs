import { Box } from '@material-ui/core';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { Layout } from '../../components/Layout';

type Post = {
  id: string;
  title: string;
  content: string;
  created_at: string;
};

type Props = {
  post: Post;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-post/`);
  const posts: Post[] = await res.json();
  const paths = posts.map((post) => {
    return {
      params: {
        id: String(post.id),
      },
    };
  });
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<Props, Post> = async ({ params }) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/detail-post/${params?.id}/`);
  const post: Post = await res.json();
  return {
    props: { post },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    revalidate: 1, // In seconds
  };
};

export default function BlogPage({ post }: Props): JSX.Element {
  const router = useRouter();
  if (router.isFallback || !post) {
    return <Box>Loading...</Box>;
  }
  return (
    <>
      <Layout title={post.title}>
        <Box>{post.content}</Box>
      </Layout>
    </>
  );
}
