import React, { VFC, useState } from 'react';
import { db } from '../firebase';

import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { ListItem, Grid, TextField } from '@material-ui/core';

type Props = {
  task: string;
  id: string;
};

const Tasks: VFC<Props> = ({ task, id }) => {
  const [newTitle, setNewTitle] = useState(task);

  const editTaskTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };

  const updateTitle = (e: React.MouseEvent<HTMLButtonElement>) => {
    db.collection('tasks').doc(id).set({ title: newTitle }, { merge: true });
    setNewTitle('');
  };

  const deleteTitle = (e: React.MouseEvent<HTMLButtonElement>) => {
    db.collection('tasks').doc(id).delete();
  };

  return (
    <div>
      <ListItem>
        <h2>{task}</h2>
        <Grid container justifyContent="flex-end">
          <TextField label="edit task" onChange={editTaskTitle}></TextField>
        </Grid>
        <button onClick={updateTitle}>
          <EditOutlinedIcon />
        </button>
        <button onClick={deleteTitle}>
          <DeleteOutlineOutlinedIcon />
        </button>
      </ListItem>
    </div>
  );
};

export default Tasks;
