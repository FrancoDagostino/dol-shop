import NextLink from 'next/link';
import { AutLayout } from '@/components/layouts'
import { Box, Grid, Typography,TextField,Button,Link } from '@mui/material';


const RegisterPage = () => {
  return (
    <AutLayout title={'Registro'}>
        <Box sx={{width:350, padding:'10px 20px'}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant='h1' component='h1'>Crear Cuenta</Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Nombre" variant='filled' fullWidth/>
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Correo" variant='filled' fullWidth/>
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Contraseña" variant='filled' type='password' fullWidth/>
                </Grid>
                <Grid item xs={12}>
                    <Button color='secondary' className='circular-btn' fullWidth size='large'>
                        Registrarse
                    </Button>
                </Grid>
                <Grid item xs={12} display='flex' justifyContent='end'>
                    <NextLink href='/auth/login' passHref legacyBehavior>
                        <Link underline='always'>
                        Ya tienes cuenta?
                        </Link>
                    </NextLink>
                </Grid>
            </Grid>
        </Box>
    </AutLayout>
  )
}

export default RegisterPage