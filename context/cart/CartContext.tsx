

import { ICartProduct, IShippingAddress} from '@/interface';
import {createContext} from 'react';

interface ContextProps{
    cart: ICartProduct[];
    numberOfItems: number;
    subTotal: number;
    tax: number;
    total: number;
    shippingAddress?: IShippingAddress;
    
    addProductToCart:(product: ICartProduct) => void;
    updateCartQuantity: (product: ICartProduct) => void;
    removeCartProduct: (product: ICartProduct) => void;
    updateAddress: (address:IShippingAddress) => void;
    createOrder: () => Promise<{hasError:boolean; message: string;}>;
}


export const CartContext = createContext({} as ContextProps)