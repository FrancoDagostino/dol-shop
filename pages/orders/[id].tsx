import { GetServerSideProps, NextPage } from 'next'
import NextLink from 'next/link';
import { CartList, OrderSummary } from '@/components/cart'
import { ShopLayout } from '@/components/layouts'
import { Box,Card, CardContent, Chip, Divider, Grid, Link, Typography } from '@mui/material'
import {CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';
import { getSession } from 'next-auth/react';
import { getOrderById } from '@/database/dbOrders';
import { IOrder } from '@/interface';

interface Props {
    order: IOrder
}

const OrderPage: NextPage<Props> = ({order}) => {

    const {shippingAddress} = order;

    const {tax,numberOfItems,subTotal,total} = order

    const summary={
        tax,
        numberOfItems,
        subTotal,
        total,
    }

  return (
    <ShopLayout title='Resumen de la orden' pageDescription="Resumen de la orden">
        <Typography variant='h1' component='h1'>Orden: {order._id}</Typography>
        
        {
            order.isPaid
            ?(
                <Chip
                    sx={{my:2}}
                    label="Pagada"
                    variant='outlined'
                    color="success"
                    icon={<CreditScoreOutlined/>}
                />
            ):(
                        
                <Chip
                    sx={{my:2}}
                    label="Pendiente de pago"
                    variant='outlined'
                    color="error"
                    icon={<CreditCardOffOutlined/>}
                />
            )
        }
        

        <Grid container>
            <Grid item xs={12} sm={7}>
                <CartList products={order.orderItems}/>
            </Grid>
            <Grid item xs={12} sm={5}>
                <Card className='summary-card'>
                    <CardContent>
                        <Typography variant='h2'>Resumen ({order.numberOfItems} {order.numberOfItems > 1 ? 'productos' : 'producto'} )</Typography>
                        <Divider sx={{my: 1}}/>

                        <Box display='flex' justifyContent='space-between'>
                            <Typography variant='subtitle1'>Dirección de entrega</Typography>
                        </Box>

                        <Typography>{shippingAddress.firstName} {shippingAddress.lastName}</Typography>
                        <Typography>{shippingAddress.address} {shippingAddress.address2 ? `, ${shippingAddress.address2}` : ''}</Typography>
                        <Typography>{shippingAddress.city}, {shippingAddress.zip}</Typography>
                        <Typography>{shippingAddress.country}</Typography>
                        <Typography>{shippingAddress.phone}</Typography>
                        
                        <Divider sx={{my:1}}/>

                        <OrderSummary
                            summary={summary}
                        />

                        <Box sx={{mt: 3}}>
                            <h1>pagar</h1>

                            <Chip
                                sx={{my:2}}
                                label="Pagada"
                                variant='outlined'
                                color="success"
                                icon={<CreditScoreOutlined/>}
                            />
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    </ShopLayout>
  )
}


// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({req,query}) => {
    
    const {id = ''} = query;

    const session:any = await getSession({req});

    if(!session){
        return{
            redirect:{
                destination:`auth/login?p={orders}${id}`,
                permanent:false
            }
        }
    }


    const order = await getOrderById(id.toString());

    if(!order){
        return{
            redirect:{
                destination:'orders/history',
                permanent:false
            }
        }
    }

    if(order.user !== session.user._id){
        return{
            redirect:{
                destination:'orders/history',
                permanent:false
            }
        } 
    }

    return {
        props: {
            order
        }
    }
}


export default OrderPage