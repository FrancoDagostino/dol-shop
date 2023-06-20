import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'
import{ FC, useState} from 'react'


interface Props{

  currentValue: number;
  maxValue: number
  updateQuantity: (quantity: number) => void;

}
export const ItemCounter: FC<Props> = ({currentValue,updateQuantity,maxValue}) => {

  
  const onAddProduct = () => {

    if(currentValue > maxValue ) return;
    updateQuantity(currentValue + 1)
  }

  const onRemoveProduct = () => {

    if(currentValue <= 1) return;

    updateQuantity(currentValue - 1)

  }

  return (
    <Box display='flex' alignItems='center'>
        <IconButton onClick={onRemoveProduct}>
            <RemoveCircleOutline/>
        </IconButton>
        <Typography sx={{width:40, textAlign:'center'}}>{currentValue}</Typography>
        <IconButton onClick={onAddProduct}>
            <AddCircleOutline/>
        </IconButton>
    </Box>
  )
}
