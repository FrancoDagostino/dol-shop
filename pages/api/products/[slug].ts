import { db } from '@/database'
import { IProduct } from '@/interface'
import { Product } from '@/models'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = 
    |{message: string}
    |IProduct

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {


    switch (req.method) {
        case 'GET':
            
            return getProductBySlug(req,res)
    
        default:
            res.status(400).json({ message: 'Error' })
    }
}


const getProductBySlug = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    const {slug} = req.query;

    await db.connect();

    const product = await Product.findOne({slug}).lean()                              
    await db.disconnect();

    


    if(!product){
        return res.status(404).json({
            message:'Producto no encontrado'
        })
    };

    product.images = product.images.map(image => {
        return image.includes('http') ? image : `${process.env.HOST_NAME}products/${image}`
    })


    res.status(200).json(product)



}

