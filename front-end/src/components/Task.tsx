import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, IconButton } from '@material-ui/core';
import React from 'react';
import Cookie from 'universal-cookie';
import Link from './Link';

type Task = {
  id: string;
  title: string;
  created_at: string;
};

type Props = {
  task: Task;
  taskDeleted: () => void;
};

const cookie = new Cookie();

export const Task: React.FC<Props> = (props) => {
  const deleteTask = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/tasks/${props.task.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${cookie.get('access_token')}`,
      },
    }).then((res) => {
      if (res.status === 401) {
        alert('JWT Token not valid');
      }
    });
    props.taskDeleted();
  };
  return (
    <>
      <Box>
        <Link
          href={{
            pathname: `/tasks/${props.task.id}`,
          }}
        >
          {props.task.id}: {props.task.title}
        </Link>
        <IconButton onClick={deleteTask}>
          <FontAwesomeIcon icon={faTrash} />
        </IconButton>
      </Box>
    </>
  );
};
