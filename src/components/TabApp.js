import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Todolist from './Todolist';

export default function TabApp() {
    
    // useState for tabs value
    const [value, setValue] = useState('home');

    // function for handling the value change when clicking a tab
    const handleChange = (event, value) => {
        setValue(value);
    }

    return (
        // 1) returns the tabs component which contains individual tab components
        // 2) renders the tab with the selected value
        <div>
            <Tabs value={value} onChange={handleChange}>
                <Tab value='home' label='Home' />
                <Tab value='todos' label='Todos' />
            </Tabs>
            {value === 'home' && <div class='home'>Welcome to the Todolist App!</div>}
            {value === 'todos' && <div><Todolist /></div>}
        </div>
    );
}