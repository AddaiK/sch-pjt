import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from '@mui/x-data-grid';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import Stack from '@mui/material/Stack';
import { createClient } from '@supabase/supabase-js';
import Swal from 'sweetalert2'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const supabaseUrl = 'https://snvtwjqwiombpwqzizoe.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNudnR3anF3aW9tYnB3cXppem9lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA5NzUwNDcsImV4cCI6MjAyNjU1MTA0N30.frr4AozItNRzCyJTyHLkoGzg-CcN0uukd8-JMvw97bo"
const supabase = createClient(supabaseUrl, supabaseKey)


export default function Items() { 
  const [open, setOpen] = useState(false);
  const [discount, setDiscount] = useState('');
  const [phone, setPhone] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [category, setCategory] = useState('');
  const [itemName, setItemName] = useState('');
  const [data, setData] = useState([]);

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const getItems = async ()=> {
    let { data: items, error } = await supabase
    .from('items')
    .select('*')

    if (error) {
        Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Failed to retrieve customer",
            showConfirmButton: false,
            timer: 1500
        });
    }
    else {
        setData(items)
    }
  }

  useEffect(() => {
    const controller = new AbortController();
    var isMounted = true

    getItems()

    return () => {
        isMounted = false
        controller.abort();
    }
}, [])

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };

    const handleSubmit = async (e)=> {
        e.preventDefault();

        const { data, error } = await supabase
        .from('items')
        .insert([
        { 
            name: itemName, 
            price: price, 
            discount: discount, 
            category: category, 
            description: description, 
            quantity: quantity, 
        },
        ])
        .select()

        if (error) {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Failed to add customer",
                showConfirmButton: false,
                timer: 1500
            });
        }
        else{
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Customer added successfully",
                showConfirmButton: false,
                timer: 1500
            });

            getItems();
            setItemName('')
            setPrice('')
            setDescription('')
            setQuantity('')
            setCategory('')
        }

    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
          field: 'name',
          headerName: 'Name',
          width: 150,
          editable: true,
        },
        {
          field: 'price',
          headerName: 'Price',
          width: 150,
          editable: true,
        },
        {
          field: 'quantity',
          headerName: 'Quantity',
          width: 200,
          editable: true,
        },
        {
            field: 'discount',
            headerName: 'Discount',
            description: 'This column has a value getter and is not sortable.',
            sortable: true,
            width: 160,
        },
        {
            field: 'category',
            headerName: 'Category',
            description: 'This column has a value getter and is not sortable.',
            sortable: true,
            width: 160,
        },
        {
            field: 'description',
            headerName: 'Description',
            description: 'This column has a value getter and is not sortable.',
            sortable: true,
            width: 160,
        },
    ];

    const rows = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
        { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    ];

  return (
    <>
        <Paper>
            <Typography variant="h3" m={9}><strong>Items</strong></Typography>
        </Paper>
        <Container>
            <div class="container my-4">
                <Button startIcon={<AddIcon/>} variant='contained' onClick={handleOpen}> Add Item</Button>
            </div>
            <div class="row">
                <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={data}
                        columns={columns}
                        initialState={{
                        pagination: {
                            paginationModel: {
                            pageSize: 5,
                            },
                        },
                        }}
                        pageSizeOptions={[5]}
                        checkboxSelection
                        disableRowSelectionOnClick
                    />
                </Box>
            </div>
        </Container>


        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
          backdrop: {
              timeout: 500,
          },
          }}
      >
          <Fade in={open}>
          <Box sx={style}>
          <Stack
            component="form"
            mb={4}
            spacing={2}
            noValidate
            autoComplete="off"
        >
                
            <TextField id="outlined-basic" value={itemName} onChange={(e)=> setItemName(e.target.value)} label="Name" variant="outlined" />
            <TextField id="outlined-basic" value={price} onChange={(e)=> setPrice(e.target.value)} label="Price" variant="outlined"  />
            <TextField id="outlined-basic" value={discount} onChange={(e)=> setDiscount(e.target.value)} label="Discount" variant="outlined"  />
            <TextField id="outlined-basic" value={description} onChange={(e)=> setDescription(e.target.value)} label="Description" variant="outlined"  />
            <TextField id="outlined-basic" value={quantity} onChange={(e)=> setQuantity(e.target.value)} label="Quantity" variant="outlined"  />

            <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Role</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={category}
                    label="Age"
                    onChange={handleChange}
                  >
                    <MenuItem value='electronics'>Electronics</MenuItem>
                    <MenuItem value='home'>Home</MenuItem>
                    <MenuItem value='books'>Books</MenuItem>
                    <MenuItem value='accessories'>Accessories</MenuItem>
                    <MenuItem value='clothes'>Clothes</MenuItem>
                  </Select>
            </FormControl>
            

        </Stack>
  
              
              <div className="text-end">
                  <Button 
                      variant="contained"
                      onClick={handleSubmit}
                  >Add Item</Button>
              </div>
          </Box>
          </Fade>
      </Modal> 
    </>
  );
}