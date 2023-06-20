import { useContext, useState } from "react";
import { CartContext } from "@/context";
import { UiContext } from "@/context/ui";
import { ClearOutlined, SearchOutlined,ShoppingCartOutlined } from "@mui/icons-material";
import { AppBar, Box, Link, Toolbar, Typography,Button,IconButton, Badge, Input, InputAdornment } from "@mui/material";
import NextLink from 'next/link'
import { useRouter } from "next/router";

export const Navbar = () => {

  const router = useRouter()

  const gender = router.pathname.replace('/category/','');

  const {startToggleMenu} = useContext(UiContext)
  const [searchTerm, setSearchTerm] = useState('');
  const [isSerachVisible, setIsSerachVisible] = useState(false);
  const {numberOfItems} = useContext(CartContext)

  const onSearchTerm = () => {
    if(searchTerm.trim().length === 0)return;
    router.push(`/search/${searchTerm}`)
}

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

            <Box sx={{display:{xs:'none', sm:'block'}}}>
              <NextLink href='/category/men' passHref legacyBehavior>
                <Link>
                  <Button color={gender === 'men' ? 'primary' : 'info'}>Hombres</Button>
                </Link>
              </NextLink>
              <NextLink href='/category/women' passHref legacyBehavior>
                <Link>
                  <Button color={gender === 'women' ? 'primary' : 'info'}>Mujeres</Button>
                </Link>
              </NextLink>
              <NextLink href='/category/kid' passHref legacyBehavior>
                <Link>
                  <Button color={gender === 'kid' ? 'primary' : 'info'}>Niños</Button>
                </Link>
              </NextLink>
            </Box>

            <Box flex={1}/>
             {/*pantallas grandes*/}
            {/* <IconButton>
                <SearchOutlined/>
            </IconButton> */}

            {
              isSerachVisible
              ? (
                  <Input
                      className="fadeIn"
                      autoFocus
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      type='text'
                      inputProps={{ autoFocus: true }}
                      placeholder="Buscar..."
                      onKeyPress={(e) => e.key === 'Enter' ? onSearchTerm():null}
                      endAdornment={
                          <InputAdornment position="end">
                              <IconButton
                                  onClick={() => setIsSerachVisible(false)}
                              >
                              <ClearOutlined />
                              </IconButton>
                          </InputAdornment>
                      }
                  />
              )
              :
              (
                <IconButton
                  sx={{display:{xs:'none',sm:'flex'}}}
                  onClick={() => setIsSerachVisible(true)}
                  className="fadeIn"
                >
                    <SearchOutlined/>
                </IconButton> 
              )
            }
            {/*pantallas pequeñas*/}
            <IconButton
              sx={{display:{xs:'flex',sm:'none'}}}
              onClick={startToggleMenu}
            >
                <SearchOutlined/>
            </IconButton>

            <NextLink href="/cart" passHref legacyBehavior>
              <Link>
                <IconButton>
                  <Badge badgeContent={numberOfItems > 9 ? '+9' : numberOfItems} color="secondary">
                    <ShoppingCartOutlined/>
                  </Badge>
                </IconButton>
              </Link>
            </NextLink>
            <Button onClick={startToggleMenu}>
              Menú
            </Button>
        </Toolbar>
    </AppBar>
  )
}
