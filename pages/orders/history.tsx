import NextLink from 'next/link';
import { ShopLayout } from '@/components/layouts'
import { Typography, Grid,Chip,Link } from '@mui/material';
import { DataGrid,GridColDef,GridRenderCellParams } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  {field:'id',headerName:'ID',width:100},
  {field:'fullname',headerName:'Nombre Completo',width:300},
  {
    field:'paid',
    headerName:'Pagada',
    description:'Muestra informacion si esta pagada la orden o no',
    width:200,
    renderCell:(params: GridRenderCellParams )=>{
      return (
        params.row.paid
          ? <Chip color="success" label="Pagada" variant="outlined"/>
          : <Chip color="error" label="No pagada" variant="outlined"/>
      )
    }
  },
  {
    field:'link',
    headerName:'Ver orden',
    width:100,
    sortable:false,
    
    renderCell:(params: GridRenderCellParams) => {
      return(
        <NextLink href={`/orders/${params.row.id}`} passHref legacyBehavior>
          <Link underline='always'>
              Ver orden
          </Link>
        </NextLink>
      )
    }
  }
]

const rows = [
  {id:1,paid:true, fullname:'Franco Dagostino'},
  {id:2,paid:false, fullname:'Rosa Melano'},
  {id:3,paid:true, fullname:'Alejandro Gado'},
  {id:4,paid:false, fullname:'Elver Galarga'},
  {id:5,paid:true, fullname:'Armando Esteban Quito'},
  {id:6,paid:true, fullname:'Juan Colo Makalister'},
]

const HistoryPage = () => {
  return (
    <ShopLayout title={'Historial de ordenes'} pageDescription={'Historial de ordenes del cliente'}>
        <Typography variant='h1' component='h1'>Historial de ordenes</Typography>

        <Grid container>
          <Grid item xs={12} sx={{height:650,width:'100%'}}>
              <DataGrid
                  rows={rows}
                  columns={columns}
                  initialState={{
                    pagination: { 
                      paginationModel: { pageSize: 10 } 
                    },
                  }}
                  pageSizeOptions={[10, 25]}
              />
          </Grid>
        </Grid>
    </ShopLayout>
  )
}

export default HistoryPage