import { useContext, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { Box, Grid, Typography,TextField,Button,Link, Chip } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
import { AutLayout } from '@/components/layouts'
import { validations } from '@/utils';
import { AuthContext } from '@/context';

type FormData = {
    email: string
    password: string
  }

const LoginPage = () => {

    const router = useRouter();
    const {register,handleSubmit,formState: { errors }} = useForm<FormData>();
    const [showError, setShowError] = useState(false);
    const {loginUser} = useContext(AuthContext);

    const destination = router.query.p?.toString() || '/'

    console.log(destination);
    const onLoginUser = async ({email,password}: FormData) => {

        setShowError(false);
        
        const isValidLogin = await loginUser(email,password);

        if(!isValidLogin){
            setShowError(true);

            setTimeout(() => {
                setShowError(false)
            }, 3000);

            return;
        }

        router.replace(destination);
    }

  return (
    <AutLayout title={'Ingresar'}>
        <form onSubmit={handleSubmit(onLoginUser)} noValidate>
            <Box sx={{width:350, padding:'10px 20px'}}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant='h1' component='h1'>Iniciar Sesión</Typography>
                        <Chip
                            label="No reconocemos ese usuario"
                            color="error"
                            icon={<ErrorOutline/>}
                            className='fadeIn'
                            sx={{display: showError ? 'flex' : 'none'}}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            type='email' 
                            label="Correo" 
                            variant='filled' 
                            fullWidth
                            {
                                ...register('email',{
                                    required:'Este campo es requerido',
                                    validate: (email) => validations.isEmail(email)
                                })
                            }
                            error = {!!errors.email}
                            helperText={errors.email?.message}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            label="Contraseña" 
                            variant='filled' 
                            type='password' 
                            fullWidth
                            {
                                ...register('password',{
                                    required: 'Este campo es requerido',
                                    minLength:{value:6,message:'Mínimo 6 caracteres'}
                                })
                            }
                            error = {!!errors.password}
                            helperText={errors.password?.message}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type='submit' 
                            color='secondary' 
                            className='circular-btn' 
                            fullWidth size='large'
                        >
                            Ingresar
                        </Button>
                    </Grid>
                    <Grid item xs={12} display='flex' justifyContent='end'>
                        <NextLink 
                            href={router.query.p ? `/auth/register?p=${router.query.p}` : '/auth/register'} 
                            passHref 
                            legacyBehavior
                        >
                            <Link underline='always'>
                                No tienes cuenta?
                            </Link>
                        </NextLink>
                    </Grid>
                </Grid>
            </Box>
        </form>
    </AutLayout>
  )
}

export default LoginPage