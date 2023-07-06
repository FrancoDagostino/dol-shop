import { db, dbProducts } from '@/database';
import { IOrder } from '@/interface'
import { Order, Product } from '@/models';
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth';
import { getSession } from 'next-auth/react'
import { authOptions } from '../auth/[...nextauth]';

type Data = 
| {message: string}
| IOrder;
export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {



    switch (req.method) {
        case 'POST':
            
            return createOrder(req,res)
        
        default:
            return res.status(400).json({message: 'BAD REQUEST'})
    }
}

async function createOrder(req: NextApiRequest, res: NextApiResponse<Data>) {

    const {orderItems,total} = req.body as IOrder;
    
    console.log(orderItems);
    // Verificar session usuario

    const session = await getServerSession(req, res, authOptions) as any;



    if(!session){
        return res.status(401).json({message: 'Debe de estar autenticado para hacer esto'});
    }

    // crear un arreglo con los productos que la persona quiere


    const productsIds = orderItems.map(producto => producto._id);
    await db.connect();

    const dbProducts = await Product.find({_id: {$in: productsIds}});

    try {
        
        const subTotal = orderItems.reduce((prev,current) => {

            const currentPrice = dbProducts.find(prod => prod.id === current._id)?.price

            return(currentPrice! * current.quantity ) + prev

        },0);


        const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);
        const backendTotal = subTotal * (taxRate + 1);

        if(total !== backendTotal){
            throw new Error('El total no cuadra con el monto');
        }

        const userId = session.user!._id 
        const newOrder = new Order({...req.body, isPaid: false,user:userId})
        await newOrder.save();
        await db.disconnect();

        return res.status(200).json(newOrder)

    } catch (error:any) {
        await db.disconnect();
        res.status(400).json({
            message: error.message || 'Revise los logs'
        })
    }




    return res.status(201).json(req.body)


}
