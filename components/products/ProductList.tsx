import { Grid } from '@mui/material';
import { PropsWithChildren, FC } from 'react';
import { initialData } from '@/database/seed-data'
import { IProduct } from '@/interface';
import { ProductCard } from './ProductCard';

interface Props extends PropsWithChildren{
    products: IProduct[]
}

export const ProductList: FC<Props> = ({products}) => {
  return (
    <Grid container spacing={4}>
        {
            products.map(product => (
                <ProductCard product={product} key={product.slug}/>
            ))
        }
    </Grid>
  )
}
