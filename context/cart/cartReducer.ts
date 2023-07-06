import { ICartProduct, IShippingAddress } from "@/interface";
import { CartState } from "./CartProvider";


type CartActionType = 
| {type: '[Cart] - LoadCart from cookies | storage', payload:ICartProduct[]}
| {type: '[Cart] - Add Product', payload:ICartProduct[]}
| {type: '[Cart] - Change products quantity', payload:ICartProduct}  
| {type: '[Cart] - Delete product', payload:ICartProduct}    
| {
    type:'[Cart] - Update order summary',
    payload: {
        numberOfItems: number;
        subTotal: number;
        tax: number;
        total: number;
    }
  }
| {type: '[Cart] - LoadAddress from Cookies', payload:IShippingAddress}

| {type: '[Cart] - Updated Address', payload:IShippingAddress}

| {type: '[Cart] - Order complete'}


export const cartReducer = (state: CartState, action: CartActionType): CartState => {


    switch (action.type) {
        case "[Cart] - Add Product":
            
           return{
            ...state,
            cart: action.payload
           }
        case "[Cart] - LoadCart from cookies | storage":
            
        return{
            ...state,
            cart: action.payload
        }

        case "[Cart] - Change products quantity":

            return{
                ...state,
                cart: state.cart.map(product => {
                    if(product._id !== action.payload._id) return product;
                    if(product.size !== action.payload.size) return product;

                    return action.payload;
                })
            }

        case "[Cart] - Delete product":
            
            return{
                ...state,
                cart: state.cart.filter(p => !(p._id === action.payload._id && p.size === action.payload.size))
            }

        case "[Cart] - Update order summary":

        return{
            ...state,
            ...action.payload
        }

        
        case "[Cart] - LoadAddress from Cookies":

        return{
            ...state,
            shippingAddress:action.payload
        }

        case "[Cart] - Updated Address":

        return{
            ...state,
            shippingAddress:action.payload
        }

        case "[Cart] - Order complete":

            return{
                ...state,
                cart:[],
                numberOfItems:0,
                subTotal:0,
                tax:0,
                total:0
            }
    
        default:
            return state
    }
}