import { ISize } from "@/interface"
import { Box, Button } from "@mui/material";
import { FC } from "react"



interface Props {
    selectedSize?: ISize,
    sizes: ISize[];
    onSelectSize: (size: ISize) => void;
}
export const SizeSelector: FC<Props> = ({selectedSize,sizes,onSelectSize}) => {
  return (
    <Box>
        {
            sizes.map(size => (
                <Button
                    key={size}
                    size='small'
                    color={selectedSize === size ? 'primary' : 'info'}
                    onClick={() => onSelectSize(size)}
                >
                    {size}
                </Button>
            ))
        }
    </Box>
  )
}
