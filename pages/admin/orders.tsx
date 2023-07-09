import useSWR from 'swr';

import { AdminLayout } from '@/components/layouts'
import { IOrder, IUser } from '@/interface';
import { ConfirmationNumberOutlined } from '@mui/icons-material'
import { Chip, Grid } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';


const columns:GridColDef[] = [
  {field:'id',headerName:'Orden Id', width:250},
  {field:'email',headerName:'Correo', width:250},
  {field:'name',headerName:'Nombe Completo', width:300},
  {field:'total',headerName:'Monto total',align:'left' ,width:200},
  {
    field:'isPaid',
    headerName:'Pagada',
    width:150,
    align:'left',
    renderCell:({row}: GridRenderCellParams) => {
      return row.isPaid
            ? (<Chip variant='outlined' label='Pagada' color="success"/>)
            : (<Chip variant='outlined' label='Pendiente' color="error"/>)
    }
  },
  {field:'noProducts',headerName:'N° Productos',align:'center',width:150},
  {
    field:'check',
    headerName:'Ver orden',
    width:150,
    renderCell:({row}: GridRenderCellParams) => {
      return(
        <a href={`/admin/orders/${row.id}`} target='_blank'>
          Ver orden
        </a>
      )
    }
  },
  {field:'createdAt',headerName:'Creada en', width:300},

]


const OrdersPage = () => {

  const {data,error} = useSWR<IOrder[]>('/api/admin/orders');

  if(!data && !error) return (<></>)

  const rows = data!.map(orden => ({
    id: orden._id,
    email: (orden.user as IUser).email,
    name: (orden.user as IUser).name,
    total: orden.total,
    isPaid: orden.isPaid,
    noProducts: orden.numberOfItems,
    createdAt: orden.createdAt
  }))

  return (
    <AdminLayout title={'Ordenes'} subTitle={'Mantenimiento de ordenes'} icon={<ConfirmationNumberOutlined/>}>
        <Grid container className='fadeIn'>
          <Grid item xs={12} sx={{height:650,width:'100%'}}>
              <DataGrid
                  rows={rows}
                  columns={columns}
                  initialState={{
                    pagination: { 
                      paginationModel: { pageSize: 10 } 
                    },
                  }}
                  pageSizeOptions={[10]}
              />
          </Grid>
        </Grid>
    </AdminLayout>
  )
}

export default OrdersPage