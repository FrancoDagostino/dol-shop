import { CartContext } from "@/context"
import { currency } from "@/utils"
import { Grid, Typography } from "@mui/material"
import { FC, useContext } from "react"


interface ISummary {
    tax: number
    numberOfItems: number
    subTotal: number
    total: number
}

interface Props {
    summary?: ISummary
}

export const OrderSummary:FC<Props> = ({summary}) => {


    const {tax,numberOfItems,subTotal,total} = summary ? summary : useContext(CartContext);

  return (
    <Grid container sx={{mt:1}} spacing={1}>
        <Grid item xs={6}>
            <Typography>No. Productos</Typography>
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography>{numberOfItems} {numberOfItems > 1 ? 'productos' : 'producto'}</Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography>SubTotal</Typography>
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography>{currency.format(subTotal)}</Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography>Impuestos {`(${Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100}%)`}</Typography>
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography>{currency.format(tax)}</Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography variant="subtitle1">Total:</Typography>
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography variant="subtitle1">{currency.format(total)}</Typography>
        </Grid>
    </Grid>
  )
}
