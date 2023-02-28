import React from 'react';
import Todotable from './Todotable';

export default function Todolist() {

    // states for todo array and single todo objects
    const [todos, setTodos] = React.useState([]);
    const [todo, setTodo] = React.useState({
        description: '',
        date: ''
    });

    // button for adding a new todo
    const handleAddTodo = () => {
        setTodos([...todos, todo]); // insert to todos
        setTodo({description:'', date:''}) // clear input
    };

    // button for deleting a todo
    const handleDeleteTodo = (row) => { // gets the current row number (index) as a parameter
        setTodos(todos.filter((todo, index) => row !== index)); // filter away the current row by comparing the indexes
    }

    // format date as d.m.yyyy
    const formatDate = (date) => {
        const dateObj = new Date(date) // convert to date object
        const d = dateObj.getDate();
        const m = dateObj.getMonth() + 1; // first month is 0 so +1 is needed
        const y = dateObj.getFullYear();
        return `${d}.${m}.${y}`;
    }

    // returns 1) the form for adding a new todo, and 2) all added todos in a table (separate imported Todotable component)
    return(
        <div>
            <h1 className='header'>Simple Todolist</h1>
            <div className='addTodo'>
                <label htmlFor='descr'>Description: </label>
                <input 
                    id='descr'
                    value={todo.description}
                    onChange={event => setTodo({...todo, description: event.target.value})}
                />
                <label htmlFor='date'> Date: </label>
                <input 
                    id='date'
                    type='date'
                    value={todo.date}
                    onChange={event => setTodo({...todo, date: event.target.value})}
                />
                <button onClick={handleAddTodo}>Add</button>
            </div>
            <Todotable todos={todos} formatDate={formatDate} handleDeleteTodo={handleDeleteTodo}/>
        </div>
    );
}