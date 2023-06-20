import { useContext, useState } from "react";
import {GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from 'next/router';

import { ShopLayout } from "@/components/layouts";
import { Box, Button, Chip, Grid, Typography } from "@mui/material";
import { ProductSlideshow, SizeSelector } from "@/components/products";
import { ItemCounter } from "@/components/ui";
import 'react-slideshow-image/dist/styles.css';
import { ICartProduct, IProduct, ISize } from "@/interface";
import { dbProducts } from "@/database";
import { CartContext } from "@/context";


interface Props {
  product: IProduct
}

const ProductPage: NextPage<Props> = ({product}) => {

  const router = useRouter();
  const {addProductToCart} = useContext(CartContext)
  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    images: product.images[0],
    price: product.price,
    size:undefined,
    slug: product.slug,
    title: product.title,
    gender: product.gender,
    quantity: 1,
  })

  const onSelectSize = (size: ISize) => {

    setTempCartProduct({
      ...tempCartProduct,
      size
    })
  }

  const updateQuantity = (quantity: number) => {
    setTempCartProduct({
      ...tempCartProduct,
      quantity
    })
  }

  const onAddProduct = () => {
    if(tempCartProduct.size === undefined ) return;
    addProductToCart({...tempCartProduct})
    router.push('/cart')
  }


  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
            <ProductSlideshow images={product.images}/>
                
        </Grid>
        <Grid item xs={12} sm={5}>
          <Box display='flex' flexDirection='column'>
            <Typography variant="h1" component='h1'>{product.title}</Typography>
            <Typography variant="subtitle1" component='h2'>${product.price}</Typography>

            {/* Cantidad */}

            <Box sx={{my:2}}>
              <Typography variant="subtitle2">Cantidad</Typography>
              <ItemCounter
                currentValue={tempCartProduct.quantity}
                maxValue={product.inStock}
                updateQuantity={updateQuantity}
              />
              <SizeSelector  
                selectedSize={tempCartProduct.size} 
                sizes={product.sizes}
                onSelectSize = {onSelectSize }
              />
            </Box>
            {
              (product.inStock > 0)
              ? (
                  <Button color="secondary" className="circular-btn" onClick={onAddProduct}>
                    {
                      tempCartProduct.size
                      ? 'Agregar al carrito'
                      : 'Seleccione una talla'
                    }
                  </Button>
              ):(
                <Chip label="No hay disponibles" color="error" variant="outlined"/>
              )
            }

            {/* descripcion */}

            <Box sx={{mt:3}}>
              <Typography variant="subtitle2">Descripción</Typography>
              <Typography variant="body2">{product.description}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

// export const getServerSideProps: GetServerSideProps =async ({params}) => {
  
 
//   const {slug} = params as {slug: string}

//   const product = await dbProducts.getProductBySlug(slug);


//   if(!product){
//     return{
//       redirect:{
//         destination:'/',
//         permanent: false
//       }
//     }
//   }

//   return{
//     props:{
//       product
//     }
//   }

// }

//TODO hacer de vuelta el getstatichpaths y el getstaticprops


export const getStaticPaths: GetStaticPaths = async () => {

  const productSlugs = await dbProducts.getAllProductSlug();


  return {
    paths: productSlugs.map(({slug}) => ({
        params:{slug}
    })),
    fallback:'blocking'

  }
}


export const getStaticProps: GetStaticProps =async ({params}) => {

  const {slug} = params as {slug: string}

  const product = await dbProducts.getProductBySlug(slug)

  if(!product){
    return{
      redirect:{
        destination:'/',
        permanent:false
      }
    }
  }

  return{
    props: {
      product
    },
    revalidate: 60 * 60 * 24
  }
  
}

export default ProductPage
