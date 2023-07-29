// src/App.js

import { useState } from 'react';
// import AddTodoForm from './components/inputTodo';
import InputTodo from './components/inputTodo';

// import LisTodo from './components/listTodo';
import ListTodo from './components/listTodo';



function App() {
  const [todoToEdit, setTodoToEdit] = useState(null);

  const handleEditTodo = (todo) => {
    setTodoToEdit(todo);
  };
  return (
    <div className='max-w-2xl mx-auto py-10'>
      <h1 className='text-3xl text-center font-semibold'>what	&apos;s the plan for today?</h1>
      <InputTodo todoToEdit={todoToEdit}/>
      <ListTodo onEditTodo={handleEditTodo}/>
    </div>
  );
}

export default App;
