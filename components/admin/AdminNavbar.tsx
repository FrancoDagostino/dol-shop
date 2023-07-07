import { useContext} from "react";
import { UiContext } from "@/context/ui";
import { AppBar, Box, Link, Toolbar, Typography,Button} from "@mui/material";
import NextLink from 'next/link'


export const AdminNavbar = () => {

  const {startToggleMenu} = useContext(UiContext)

  return (
    <AppBar>
        <Toolbar>
            <NextLink href='/' passHref legacyBehavior>
                <Link display='flex' alignItems='center'>
                  <Typography variant='h6'>Dolce |</Typography>
                  <Typography sx={{ml:0.5}}>Shop</Typography>
                </Link>
            </NextLink>
            <Box flex={1}/>

            <Button onClick={startToggleMenu}>
              Menú
            </Button>
        </Toolbar>
    </AppBar>
  )
}
