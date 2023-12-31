import { useContext, useState } from 'react';
import NextLink from 'next/link';
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import { Box, Grid, Typography,TextField,Button,Link, Chip, Divider } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';

import { AutLayout } from '@/components/layouts'
import { validations } from '@/utils';
import { AuthContext } from '@/context';
import { getSession, signIn } from 'next-auth/react';


type FormData = {
    email: string;
    password: string;
    name: string;
  }

const RegisterPage = () => {
    const router = useRouter();
    const {registerUser} = useContext(AuthContext);

    const {register,handleSubmit,formState: { errors }} = useForm<FormData>();
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')

    
    const onRegisterForm = async({name,email,password}: FormData) => {
        setShowError(false);
        const {hasError,message} = await registerUser(name,email,password);
        
        if(hasError){
            setShowError(true);
            setErrorMessage(message || '');
            setTimeout(() => {
                setShowError(false);
            }, 3000);
            return;
        }
        // const destination = router.query.p?.toString() || '/'
        // router.replace(destination);

        await signIn('credentials',{email,password})
    }

  return (
    <AutLayout title={'Registro'}>
        <form onSubmit={handleSubmit(onRegisterForm)}>
            <Box sx={{width:350, padding:'10px 20px'}}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant='h1' component='h1'>Crear Cuenta</Typography>
                        <Chip
                            label={errorMessage}
                            color="error"
                            icon={<ErrorOutline/>}
                            sx={{display: showError ? 'flex' : 'none'}}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            label="Nombre" 
                            variant='filled' 
                            fullWidth
                            {...register('name',{
                                required:'Este campo es requerido',
                                minLength:{value:3,message:'mínimo caracter permitidos 3'},
                                pattern: {
                                    value: /^[A-Za-z ]*$/,
                                    message: 'Ingresa solo letras',
                                  },
                            })}
                            error= {!!errors.name}
                            helperText={errors.name?.message}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            type="email" 
                            label="Correo" 
                            variant='filled' 
                            fullWidth
                            {...register('email',{
                                required:'Este campo es requerido',
                                validate: validations.isEmail
                            })}
                            error= {!!errors.email}
                            helperText={errors.email?.message}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            label="Contraseña" 
                            variant='filled' 
                            type='password' 
                            fullWidth
                            {...register('password',{
                                required:'Este campo es requerido',
                                minLength:{value:6,message:'mínimo caracter permitidos 6'}
                            })}
                            error= {!!errors.password}
                            helperText={errors.password?.message}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button 
                            type="submit"
                            color='secondary' 
                            className='circular-btn' 
                            fullWidth size='large'
                        >
                            Registrarse
                        </Button>
                    </Grid>
                    <Grid item xs={12} display='flex' justifyContent='end'>
                        <NextLink 
                            href={router.query.p ? `/auth/login?p=${router.query.p}` : '/auth/login'} 
                            passHref 
                            legacyBehavior
                        >
                            <Link underline='always'>
                            Ya tienes cuenta?
                            </Link>
                        </NextLink>
                    </Grid>  
                </Grid>
            </Box>
        </form>
    </AutLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({req,query}) => {
    
    const session = await getSession({req});

    const { p = '/'} = query; 

    if(session){
        return {
            redirect:{
                destination:p.toString(),
                permanent: false
            }
        }
    }

    return {
        props: {
            
        }
    }
}

export default RegisterPage