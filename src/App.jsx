import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, toggleTodo, deleteTodo } from './features/todoSlice';
import './App.css';

const App = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);

  const [newTodo, setNewTodo] = useState('');
  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      dispatch(addTodo(newTodo.trim()));
      setNewTodo('');
    }
  };

  const handleToggleTodo = (id) => {
    dispatch(toggleTodo(id));
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <div className='main container-fluid p-5'>
      <div className='inner'>
        <label htmlFor="heading" className="form-label">
          <h1>ToDo App</h1>
        </label>
        <div className='d-flex fom1'>
          <input
            id="enter"
            className="form-control enterbox"
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button className='btn btn-primary ms-3' onClick={handleAddTodo}>
            Add Todo
          </button>
        </div>
        <div>
          <h2>All Todos</h2>
          <ul>
{todos.map((todo) => (
  <li className='border rounded p-2 text-start m-2' key={todo.id} style={{ backgroundColor: todo.completed ? 'lightgreen' : 'white' }}>
    <div className='d-flex'>
      <span
        style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
        onClick={() => handleToggleTodo(todo.id)}
      >
        <h5 className='ms-3 me-5'>{todo.text}</h5>
      </span>
      <input
        type='checkbox'
        id={`btncheck${todo.id}`}  // Use a unique id for each checkbox
        checked={todo.completed}
        onChange={() => handleToggleTodo(todo.id)}
        className='btn btn-check'
      />
      <label className="btn btn-outline-primary ms-auto" htmlFor={`btncheck${todo.id}`}>Done</label>
      <button
        className='btn btn-info ms-3'
        onClick={() => handleDeleteTodo(todo.id)}
      >
        Delete
      </button>
    </div>
  </li>
))}
          </ul>
        </div>
        <div>
          <h2>Completed Todos :{completedTodos.length}</h2>
        </div>
      </div>
    </div>
  );
};

export default App;
