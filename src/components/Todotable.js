import React from 'react';

// returns a table with all added todos
export default function Todotable(props) { // props: todos state, formatDate and handleDeleteTodo
    return(
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Date</th>
                        <th>Priority</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.todos.map((todo, index) => 
                            <tr key={index}>
                                <td>{todo.description}</td>
                                <td>{todo.priority}</td>
                                <td>{props.formatDate(todo.date)}</td>
                                <td><button onClick={() => props.handleDeleteTodo(index)}>Done</button></td>
                            </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
}