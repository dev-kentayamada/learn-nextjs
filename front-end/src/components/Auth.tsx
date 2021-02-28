import { Box, Button, Grid, LinearProgress, Link, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Layout } from './Layout';

type AuthForm = {
  email: string;
  password: string;
};

export const Auth: React.FC = () => {
  const {
    handleSubmit,
    register,
    errors,
    formState: { isSubmitting },
  } = useForm<AuthForm>();

  const [login, setLogin] = useState(true);

  return (
    <>
      <Layout title="Login/Singup">
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 'inherit',
          }}
        >
          <Box sx={{ width: '50%' }}>
            <form onSubmit={handleSubmit((data: AuthForm) => console.log(data))}>
              <Grid
                container
                sx={{
                  '&>*': {
                    paddingTop: '1rem',
                  },
                }}
              >
                <Grid item xs={12} sx={{ textAlign: 'center' }}>
                  {login ? 'Login' : 'Signup'}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="メール"
                    fullWidth
                    name="email"
                    type="email"
                    inputRef={register({
                      required: 'required!',
                    })}
                    error={Boolean(errors.email)}
                    helperText={errors.email && errors.email.message}
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
                  {isSubmitting && <LinearProgress />}
                  <Button fullWidth variant="contained" type="submit">
                    {login ? 'ログイン':'登録する'}
                  </Button>
                </Grid>
                <Grid item xs={12} sx={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                  <Box sx={{ fontSize: '1rem' }}>
                    {login ? 'アカウントをお持ちでないですか？' : 'アカウントをお持ちですか？'}
                    <Link
                      component="button"
                      variant="body2"
                      onClick={() => (login ? setLogin(false) : setLogin(true))}
                      type="button"
                      sx={{ fontSize: '1rem' }}
                      underline="none"
                    >
                      {login ? '登録する' : 'ログインする'}
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
