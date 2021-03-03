import { Box } from '@material-ui/core';
import { GetStaticPaths, GetStaticProps } from 'next';
import Error from 'next/error';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import useSWR from 'swr';
import { Layout } from '../../components/Layout';

type Task = {
  id: string;
  title: string;
  created_at: string;
};

type Props = {
  staticTask: Task;
  errorCode: number | boolean;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-task/`);
  const tasks: Task[] = await res.json();
  const paths = tasks.map((task) => {
    return {
      params: {
        id: String(task.id),
      },
    };
  });
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<Props, Task> = async ({ params }) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/detail-task/${params?.id}/`);
  const errorCode = res.ok ? false : res.status;
  const staticTask: Task = await res.json();
  return {
    props: { errorCode, staticTask },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    revalidate: 1, // In seconds
  };
};

export default function TaskPage({ errorCode, staticTask }: Props): JSX.Element {
  const router = useRouter();
  const { data: task, mutate } = useSWR<Task>(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/detail-task/${staticTask?.id}`,
    {
      initialData: staticTask,
    },
  );

  useEffect(() => {
    mutate();
  }, [mutate]);

  if (router.isFallback || !task) {
    return <Box>Loading...</Box>;
  }

  if (typeof errorCode === 'number') {
    return <Error statusCode={errorCode} />;
  }

  return (
    <Layout title={task.title}>
      <Box>{task.title}</Box>
    </Layout>
  );
}
