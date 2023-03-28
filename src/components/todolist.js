import React, { useState, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

export default function Todolist() {

    // states for todo array and single todo objects
    const [todos, setTodos] = useState([]);
    const [todo, setTodo] = useState({
        description: '',
        date: '',
        priority: ''
    });
    // reference for ag-grid component's methods
    const gridRef = useRef();
    // ag-grid table columns: columnDefs defines single columns and gridOptions defines all rows
    const columnDefs = [
        {field: 'description', sortable: true, filter: true, floatingFilter: true},
        {field: 'date', sortable: true, filter: true, floatingFilter: true},
        {field: 'priority', sortable: true, filter: true, floatingFilter: true,
        cellStyle: params => params.value === 'High' ? {color: 'red'} : {color: 'black'}}, // if priority is 'High' it is shown as red
    ];
    const gridOptions = {
        animateRows: true
    };

    // state for the date from datepicker
    const [date, setDate] = useState(''); // empty string at first

    // function for handling the date change
    function handleChangeDate(pickedDate) {
        setDate(pickedDate); // picked date is set as date state
        // format picked date as d.m.yyyy (datejs date has $D, $M and $y attributes)
        const formattedDate = pickedDate.$D ? `${pickedDate.$D}.${pickedDate.$M + 1}.${pickedDate.$y}` : ''; // if $D doesn't exist, date is set as blank
        setTodo({...todo, date: formattedDate}); // the formatted date is set as todo's date
    }

    // button for adding a new todo
    const handleAddTodo = () => {
        setTodos([...todos, todo]); // insert to todos
        setTodo({description:'', date:'', priority: ''}); // clear todo input
        setDate(''); // clear datepicker
    };

    // button for deleting a todo
    const handleDeleteTodo = () => {
        // filter away the current row by comparing the indexes
        if (gridRef.current.getSelectedNodes().length > 0)
            setTodos(todos.filter((todo, index) => gridRef.current.getSelectedNodes()[0].id != index));
        else
            alert('Please select a row');
    }

    // returns 1) the form for adding a new todo, and 2) all added todos in a table (ag-grid)
    return(
        <div>
            
            <div className='addTodo'>
                <Stack direction='row' spacing={2} alignItems='center' justifyContent='center'>
                    <TextField 
                        variant='outlined'
                        label='description'
                        id='descr'
                        value={todo.description}
                        onChange={event => setTodo({...todo, description: event.target.value})}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label='date'
                            value={date}
                            format='DD.MM.YYYY'
                            onChange={date => handleChangeDate(date)} 
                        />
                    </LocalizationProvider>
                    <TextField 
                        variant='outlined'
                        label='priority'
                        id='priority'
                        value={todo.priority}
                        onChange={event => setTodo({...todo, priority: event.target.value})}
                    /> 
                    <Button size='medium' startIcon={<AddIcon/>} variant='contained' onClick={handleAddTodo}>Add</Button>
                    <Button size='medium' startIcon={<DeleteIcon/>} variant='contained' color='error' onClick={handleDeleteTodo}>Delete</Button>
                </Stack>
            </div>
            <div className='ag-theme-material' style={{height: 500, width: 600, margin: 'auto'}}>
                <AgGridReact 
                    ref={gridRef}
                    onGridReady = {params => gridRef.current = params.api}
                    rowData={todos}
                    columnDefs={columnDefs}
                    gridOptions={gridOptions}
                    rowSelection='single' // for selecting a row for delete functionality
                />
            </div>
            
        </div>
    );
}