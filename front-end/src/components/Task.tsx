import { Box } from '@material-ui/core';
import React from 'react';
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
export const Task: React.FC<Props> = (props) => {
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
      </Box>
    </>
  );
};
