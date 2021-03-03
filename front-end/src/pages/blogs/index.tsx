import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import React from 'react';
import { Layout } from '../../components/Layout';
import Link from '../../components/Link';

type Blog = {
  id: string;
  title: string;
  content: string;
  created_at: string;
};

type Props = {
  blogs: Blog[];
};

export const getServerSideProps: GetServerSideProps<Props, Blog> = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-post/`);
  if (res.status === 404) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  const blogs: Blog[] = await res.json();

  return {
    props: {
      blogs,
    },
  };
};

export default function Blogs({ blogs }: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  const filteredBlogs = blogs.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  return (
    <>
      <Layout title="Blogs">
        <ol>
          {filteredBlogs.map((blog, index) => (
            <li key={index}>
              <Link
                href={{
                  pathname: `/blogs/${blog.id}`,
                }}
              >
                {blog.title}
              </Link>
            </li>
          ))}
        </ol>
      </Layout>
    </>
  );
}
