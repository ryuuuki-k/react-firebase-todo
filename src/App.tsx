import React, { useState, useEffect, VFC } from 'react';
import './App.css';
import { db } from './firebase';

import { FormControl, List, TextField } from '@material-ui/core';
import { AddToPhotos, ExitToApp } from '@material-ui/icons';
import Tasks from './Components/Tasks';
import { auth } from './firebase';

import { RouteComponentProps } from 'react-router-dom';
interface Props extends RouteComponentProps<{}> {}

const App: VFC<Props> = ({ history }) => {
  const [tasks, setTasks] = useState([{ id: '', title: '' }]);
  const [newTask, setNewTask] = useState('');

  const inputTask = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(e.target.value);
  };

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      !user && history.push('/');
    });
    return () => unSub();
  }, []);

  useEffect(() => {
    const unSub = db.collection('tasks').onSnapshot((snapshot) => {
      setTasks(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
        }))
      );
    });
    return () => unSub();
  }, []);

  const addTask = (e: React.MouseEvent<HTMLButtonElement>) => {
    db.collection('tasks').add({ title: newTask });
    setNewTask('');
  };

  const logout = async () => {
    try {
      await auth.signOut();
      history.push('/login');
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <div className="App">
      <h1>TodoApp with React + TS + Firebase</h1>
      <button onClick={logout}><ExitToApp /></button>
      <FormControl>
        <TextField
          InputLabelProps={{ shrink: true }}
          label="new task"
          onChange={inputTask}
        />
      </FormControl>
      <button disabled={!newTask} onClick={addTask}>
        <AddToPhotos />
      </button>
      <List>
        {tasks.map((task) => (
          <Tasks task={task.title} id={task.id} key={task.id} />
        ))}
      </List>
    </div>
  );
};

export default App;
