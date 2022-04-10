import React, { useState, useEffect, VFC } from 'react';
import { Button, FormControl, TextField, Typography } from '@material-ui/core';
import { auth } from '../firebase';

import { RouteComponentProps } from 'react-router-dom';

interface Props extends RouteComponentProps<{}> {}

const Login: VFC<Props> = ({ history }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const setEmailHadler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const setPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const LoginFn = async () => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      history.push('/');
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const RegisterFn = async () => {
    try {
      await auth.createUserWithEmailAndPassword(email, password);
      history.push('/');
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const changeLoginOrRegister = () => {
    setIsLogin(!isLogin);
  };

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      user && history.push('/');
    });
    return () => unSub();
  }, [history]);

  return (
    <div>
      <h1>{isLogin ? 'Login' : 'Register'}</h1>
      <div>
        <FormControl>
          <TextField label="email" name="email" onChange={setEmailHadler} />
        </FormControl>
      </div>
      <div>
        <FormControl>
          <TextField
            label="password"
            name="password"
            type="password"
            onChange={setPasswordHandler}
          />
        </FormControl>
      </div>
      <div>
        <Button
          variant="contained"
          size="small"
          color="primary"
          onClick={isLogin ? LoginFn : RegisterFn}
        >
          {isLogin ? 'Loign' : 'Register'}
        </Button>
      </div>
      <div>
        <Typography align="center">
          <span onClick={changeLoginOrRegister}>
            {isLogin ? 'create new account?' : 'Login?'}
          </span>
        </Typography>
      </div>
    </div>
  );
};

export default Login;
