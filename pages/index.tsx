import { Inter } from 'next/font/google'
import { ShopLayout } from '@/components/layouts'
import { Typography } from '@mui/material'
import { ProductList } from '@/components/products'
import { useProducts } from '@/hooks'
import { FullScreenLoading } from '@/components/ui'

const inter = Inter({ subsets: ['latin'] })




export default function Home() {

  const {products,isLoading} = useProducts('/products');

  return (
    <>
      <ShopLayout title={'Dolce-Shop - Home'} pageDescription='Encuentra los mejores productos'>
        <Typography variant='h1' component='h1'>Tienda</Typography>
        <Typography variant='h2' sx={{mb:1}}>Todos los productos</Typography>
         {
          isLoading
            ? <FullScreenLoading/>
            : <ProductList products={products}/>
         }

      </ShopLayout>
    </>
  )
}
