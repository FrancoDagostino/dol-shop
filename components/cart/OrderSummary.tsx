import { CartContext } from "@/context"
import { currency } from "@/utils"
import { Grid, Typography } from "@mui/material"
import { FC, useContext } from "react"


interface Props {
    orderValues?: {
        numberOfItems: number;
        subTotal: number;
        total: number;
        tax: number
    }
}

export const OrderSummary:FC<Props> = ({orderValues}) => {


    const {tax,numberOfItems,subTotal,total} = useContext(CartContext);

    const summaryValues = orderValues ? orderValues : {tax,numberOfItems,subTotal,total};

  return (
    <Grid container sx={{mt:1}} spacing={1}>
        <Grid item xs={6}>
            <Typography>No. Productos</Typography>
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography>{summaryValues.numberOfItems} {summaryValues.numberOfItems > 1 ? 'productos' : 'producto'}</Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography>SubTotal</Typography>
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography>{currency.format(summaryValues.subTotal)}</Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography>Impuestos {`(${Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100}%)`}</Typography>
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography>{currency.format(summaryValues.tax)}</Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography variant="subtitle1">Total:</Typography>
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography variant="subtitle1">{currency.format(summaryValues.total)}</Typography>
        </Grid>
    </Grid>
  )
}
