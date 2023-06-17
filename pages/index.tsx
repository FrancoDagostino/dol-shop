import { Inter } from 'next/font/google'
import { ShopLayout } from '@/components/layouts'
import { Typography } from '@mui/material'
import { initialData } from '@/database/products'
import { ProductList } from '@/components/products'

const inter = Inter({ subsets: ['latin'] })



export default function Home() {
  return (
    <>
      <ShopLayout title={'Dolce-Shop - Home'} pageDescription='Encuentra los mejores productos'>
        <Typography variant='h1' component='h1'>Tienda</Typography>
        <Typography variant='h2' sx={{mb:1}}>Todos los productos</Typography>

        <ProductList 
          products={initialData.products as any}
        />

      </ShopLayout>
    </>
  )
}
