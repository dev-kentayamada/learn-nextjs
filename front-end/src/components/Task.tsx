import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, IconButton, Popover, TextField } from '@material-ui/core';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Cookie from 'universal-cookie';
import Link from './Link';

type Task = {
  id: string;
  title: string;
  created_at: string;
};

type Props = {
  task: Task;
  deleteCache: () => void;
};

type Form = {
  title: string;
};

const cookie = new Cookie();

export const Task: React.FC<Props> = (props) => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const {
    handleSubmit,
    register,
    errors,
    formState: { isSubmitting },
    reset,
  } = useForm<Form>();
  const deleteTask = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/tasks/${props.task.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${cookie.get('access_token')}`,
      },
    }).then((res) => {
      if (res.status === 401) {
        alert('Please login before delete task');
        cookie.remove('access_token');
        router.push('/auth');
      }
    });
    props.deleteCache();
  };

  const update = async (editedTitle: string) => {
    await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/tasks/${props.task.id}/`, {
      method: 'PUT',
      body: JSON.stringify({ title: editedTitle }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${cookie.get('access_token')}`,
      },
    }).then((res) => {
      if (res.status === 401) {
        alert('Please login before update task');
        cookie.remove('access_token');
        router.push('/auth');
      }
    });
    props.deleteCache();
  };

  return (
    <>
      <Link
        href={{
          pathname: `/tasks/${props.task.id}`,
        }}
      >
        {props.task.title}
      </Link>
      <IconButton onClick={deleteTask}>
        <FontAwesomeIcon icon={faTrash} />
      </IconButton>
      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
        <FontAwesomeIcon icon={faEdit} />
      </IconButton>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <form
          onSubmit={handleSubmit((data: Form) => {
            update(data.title);
            reset({ title: '' });
          })}
        >
          <TextField
            label="Task"
            name="title"
            type="text"
            defaultValue={props.task.title}
            inputRef={register({
              required: 'required!',
            })}
            error={Boolean(errors.title)}
            helperText={errors.title && errors.title.message}
          />
          <Button disabled={isSubmitting} variant="contained" type="submit">
            UPDATE
          </Button>
        </form>
      </Popover>
    </>
  );
};
