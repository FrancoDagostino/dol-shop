import {FC,PropsWithChildren,useEffect,useReducer} from 'react'
import Cookie from 'js-cookie';

import { CartContext,cartReducer } from './'
import { ICartProduct, IOrder, IShippingAddress, ISize } from '@/interface'
import Cookies from 'js-cookie';
import { tesloApi } from '@/axiosApi';
import axios from 'axios';


export interface CartState {
    cart: ICartProduct[];
    numberOfItems: number;
    subTotal: number;
    tax: number;
    total: number;
    shippingAddress?: IShippingAddress;
}

const CART_INITIAL_STATE: CartState = {
   cart:[],
   numberOfItems: 0,
   subTotal: 0,
   tax: 0,
   total: 0,
   shippingAddress: undefined
}


export const CartProvider: FC<PropsWithChildren> = ({children}) => {


    const [state, dispatch] = useReducer(cartReducer,CART_INITIAL_STATE);

    useEffect(() => {
      
        try {
            const productInCookies = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : []
            dispatch({type:'[Cart] - LoadCart from cookies | storage',payload:productInCookies})
        } catch (error) {
            dispatch({type:'[Cart] - LoadCart from cookies | storage',payload:[]})
        }

    }, [])

    useEffect(() => {

        try {
            
            if(Cookie.get('firstName')){

                const address: IShippingAddress = {
                    firstName: Cookies.get('firstName') || '',
                    lastName: Cookies.get('lastName') || '',
                    address: Cookies.get('address') || '',
                    address2: Cookies.get('address2') || '',
                    zip: Cookies.get('zip') || '',
                    city: Cookies.get('city') || '',
                    country: Cookies.get('country') || '',
                    phone: Cookies.get('phone') || '',
                }
                dispatch({type:'[Cart] - LoadAddress from Cookies',payload:address})
            }

        } catch (error) {
        
        }

    }, [])
    
    

    useEffect(() => {
        
        Cookie.set('cart',JSON.stringify(state.cart));

    }, [state.cart])


    useEffect(() => {
        
        const numberOfItems = state.cart.reduce( (prev,current )=> current.quantity + prev ,0);

        const subTotal = state.cart.reduce((prev,current) => (current.price * current.quantity) + prev , 0 )

        const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);

        const  orderSummary = {
            numberOfItems,
            subTotal,
            tax: subTotal * taxRate,
            total: subTotal * (taxRate + 1)
        }

        dispatch({type:'[Cart] - Update order summary',payload:orderSummary})
        

    }, [state.cart])
    


    const addProductToCart = (product: ICartProduct) => {

        const productInCart = state.cart.some(p => p._id === product._id && p.size === product.size);

        if(!productInCart) return dispatch({type:'[Cart] - Add Product',payload:[...state.cart,product]})

        const updatedProducts = state.cart.map(p => {
            p.quantity += product.quantity
            return p
        })

        dispatch({type:'[Cart] - Add Product',payload:updatedProducts})
    }


    const updateCartQuantity = (product:ICartProduct) => {

        dispatch({type:'[Cart] - Change products quantity',payload:product})
    }

    const removeCartProduct = (product: ICartProduct) => {

        dispatch({type:'[Cart] - Delete product',payload:product})

    }


    const updateAddress = (address:IShippingAddress) => {

        Cookies.set('firstName',address.firstName);
        Cookies.set('lastName',address.lastName);
        Cookies.set('address',address.address);
        Cookies.set('address2',address.address2 || '');
        Cookies.set('zip',address.zip);
        Cookies.set('city',address.city);
        Cookies.set('country',address.country);
        Cookies.set('phone',address.phone);

        dispatch({type:'[Cart] - Updated Address',payload:address})
    }


    const createOrder = async():Promise<{hasError:boolean; message: string;}> => {


        if(!state.shippingAddress){
            throw new Error('No hay dirección de entrega')
        }


        const body: IOrder = {
            orderItems: state.cart.map(p => ({
                ...p,
                size: p.size!
            })),
            shippingAddress: state.shippingAddress,
            numberOfItems: state.numberOfItems,
            subTotal: state.subTotal,
            tax: state.tax,
            total: state.total,
            isPaid: false,
        }

        try {
            const {data} = await tesloApi.post<IOrder>('/orders',body);

            dispatch({type:'[Cart] - Order complete'});

            return {
                hasError: false,
                message: data._id!
            }
        } catch (error) {
            
            if(axios.isAxiosError(error)){
                return {
                    hasError:true,
                    message: error.response?.data.message
                }
            }

            return {
                hasError:true,
                message:'Error no controlado'
            }
        }
    }

    return(
        <CartContext.Provider value={{
            ...state,

            addProductToCart,
            updateCartQuantity,
            removeCartProduct,
            updateAddress,

            createOrder
        }}>
            {children}
        </CartContext.Provider>
    )

}
