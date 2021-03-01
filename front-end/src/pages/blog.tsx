import { Box } from '@material-ui/core';
import { InferGetStaticPropsType } from 'next';
import React from 'react';
import { Layout } from '../components/Layout';
import Link from '../components/Link';

type Post = {
  id: string;
  title: string;
  content: string;
  created_at: string;
};

export const getStaticProps = async (): Promise<{
  props: {
    filteredPosts: Post[];
  };
}> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-post/`);
  const posts: Post[] = await res.json();
  const filteredPosts = posts.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  return {
    props: {
      filteredPosts,
    },
  };
};

export default function Blog({ filteredPosts }: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  return (
    <Layout title="blog">
      <Box sx={{ textAlign: 'center' }}>
        {filteredPosts.map((post, index) => (
          <Box key={index}>
            <Link
              href={{
                pathname: `/posts/${post.id}`,
              }}
            >
              {post.id}: {post.title}
            </Link>
          </Box>
        ))}
      </Box>
    </Layout>
  );
}
