import { Box, Button, CircularProgress, Grid, Link, TextField } from '@material-ui/core';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Cookie from 'universal-cookie';
import { Layout } from './Layout';

const cookie = new Cookie();

type AuthForm = {
  username: string;
  password: string;
};

export const Auth: React.FC = () => {
  const {
    handleSubmit,
    register,
    errors,
    formState: { isSubmitting },
  } = useForm<AuthForm>();

  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  const login = async (props: AuthForm) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 5000)); // 3秒待つ
      await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/auth/jwt/create/`, {
        method: 'POST',
        body: JSON.stringify({ username: props.username, password: props.password }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          if (res.status === 400) {
            throw 'authentication failed';
          } else if (res.ok) {
            return res.json();
          }
        })
        .then((data) => {
          const options = { path: '/' };
          cookie.set('access_token', data.access, options);
        });
      router.push('/home');
    } catch (err) {
      alert(err);
    }
  };

  const signup = async (props: AuthForm) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/register/`, {
        method: 'POST',
        body: JSON.stringify({ username: props.username, password: props.password }),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => {
        if (res.status === 400) {
          throw 'authentication failed';
        }
      });
      login(props);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      <Layout title={isLogin ? 'Login' : 'Signup'}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 'inherit',
          }}
        >
          <Box sx={{ width: '50%' }}>
            <form
              onSubmit={handleSubmit((data: AuthForm) => {
                isLogin ? login(data) : signup(data);
              })}
            >
              <Grid
                container
                sx={{
                  '&>*': {
                    paddingTop: '1rem',
                  },
                }}
              >
                <Grid item xs={12} sx={{ textAlign: 'center' }}>
                  {isLogin ? 'Login' : 'Signup'}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="名前"
                    fullWidth
                    name="username"
                    type="text"
                    inputRef={register({
                      required: 'required!',
                    })}
                    error={Boolean(errors.username)}
                    helperText={errors.username && errors.username.message}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="パスワード"
                    fullWidth
                    name="password"
                    type="password"
                    autoComplete="on"
                    inputRef={register({
                      required: 'required!',
                    })}
                    error={Boolean(errors.password)}
                    helperText={errors.password && errors.password.message}
                  />
                </Grid>
                <Grid item xs={12}>
                  {isSubmitting && <CircularProgress />}
                  <Button disabled={isSubmitting} fullWidth variant="contained" type="submit">
                    {isLogin ? 'ログイン' : '登録する'}
                  </Button>
                </Grid>
                <Grid item xs={12} sx={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                  <Box sx={{ fontSize: '1rem' }}>
                    {isLogin ? 'アカウントをお持ちでないですか？' : 'アカウントをお持ちですか？'}
                    <Link
                      component="button"
                      variant="body2"
                      onClick={() => (isLogin ? setIsLogin(false) : setIsLogin(true))}
                      type="button"
                      sx={{ fontSize: '1rem' }}
                      underline="none"
                    >
                      {isLogin ? '登録する' : 'ログインする'}
                    </Link>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Box>
      </Layout>
    </>
  );
};
