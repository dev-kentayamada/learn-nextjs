import { Box } from '@material-ui/core';
import { InferGetStaticPropsType } from 'next';
import React, { useEffect } from 'react';
import useSWR from 'swr';
import { Layout } from '../components/Layout';
import { Task } from '../components/Task';

type Task = {
  id: string;
  title: string;
  created_at: string;
};

export const getStaticProps = async (): Promise<{
  props: {
    staticfilterdTasks: Task[];
  };
  revalidate: number;
}> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-task/`);
  const tasks: Task[] = await res.json();
  const staticfilterdTasks = tasks.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  return {
    props: { staticfilterdTasks },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    revalidate: 1, // In seconds
  };
};

export default function Page({ staticfilterdTasks }: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  const { data: tasks, mutate } = useSWR<Task[]>(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-task/`, {
    initialData: staticfilterdTasks,
  });
  const filteredTasks = tasks?.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  useEffect(() => {
    mutate();
  }, [mutate]);

  return (
    <>
      <Layout title="task">
        <Box sx={{ textAlign: 'center' }}>
          {filteredTasks &&
            filteredTasks.map((task, index) => (
              <Task key={index} task={task} taskDeleted={mutate} />

            ))}
        </Box>
      </Layout>
    </>
  );
}
