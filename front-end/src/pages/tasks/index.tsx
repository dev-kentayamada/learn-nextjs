import { Button, TextField } from '@material-ui/core';
import { InferGetStaticPropsType } from 'next';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';
import Cookie from 'universal-cookie';
import { Layout } from '../../components/Layout';
import { Task } from '../../components/Task';

const cookie = new Cookie();

type Task = {
  id: string;
  title: string;
  created_at: string;
};

type Form = {
  title: string;
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

export default function Tasks({ staticfilterdTasks }: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  const { data: tasks, mutate } = useSWR<Task[]>(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-task/`, {
    initialData: staticfilterdTasks,
  });
  const filteredTasks = tasks?.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  const {
    handleSubmit,
    register,
    errors,
    formState: { isSubmitting },
    reset,
  } = useForm<Form>();
  const create = async (props: Form) => {
    await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/tasks/`, {
      method: 'POST',
      body: JSON.stringify({ title: props.title }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${cookie.get('access_token')}`,
      },
    }).then((res) => {
      if (res.status === 401) {
        alert('JWT Token not valid');
      }
    });
    mutate();
  };

  useEffect(() => {
    mutate();
  }, [mutate]);

  return (
    <>
      <Layout title="Tasks">
        <form
          onSubmit={handleSubmit((data: Form) => {
            create(data);
            reset({ title: '' });
          })}
        >
          <TextField
            label="Task"
            name="title"
            type="text"
            inputRef={register({
              required: 'required!',
            })}
            error={Boolean(errors.title)}
            helperText={errors.title && errors.title.message}
          />
          <Button disabled={isSubmitting} variant="contained" type="submit">
            CREATE
          </Button>
        </form>
        <ol>
          {filteredTasks &&
            filteredTasks.map((task, index) => (
              <li key={index}>
                <Task task={task} deleteCache={mutate} />
              </li>
            ))}
        </ol>
      </Layout>
    </>
  );
}
