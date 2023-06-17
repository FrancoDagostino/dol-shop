import { Grid, Typography } from "@mui/material"



export const OrderSummary = () => {



  return (
    <Grid container sx={{mt:1}} spacing={1}>
        <Grid item xs={6}>
            <Typography>No. Productos</Typography>
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography>3 items</Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography>SubTotal</Typography>
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography>${150.36}</Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography>Impuestos (15%)</Typography>
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography>${35.34}</Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography variant="subtitle1">Total:</Typography>
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography variant="subtitle1">${200.22}</Typography>
        </Grid>
    </Grid>
  )
}
