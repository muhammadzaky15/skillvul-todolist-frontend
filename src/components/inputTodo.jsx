import  { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo, editTodo, addTodoAsync, editTodoAsync } from '../redux/todoSlice';

function InputTodo  ({ todoToEdit }) {
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();
  const inputRef = useRef(null); 

  useEffect(() => {
    if (todoToEdit) {
      setTitle(todoToEdit.title);
    }
    inputRef.current.focus();
  }, [todoToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() !== '') {
      if (todoToEdit) {
        const editedTodo = {
          id: todoToEdit.id,
          title,
          completed: todoToEdit.completed,
        };
        dispatch(editTodoAsync(editedTodo));
      } else {
        dispatch(addTodoAsync({
          title
        }));
      }
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex py-5 items-center justify-between'>
      <input
        type="text"
        className='shadow-lg p-4 py-3 peer h-full w-full outline-none text-base tracking-wide text-gray-700 pr-2 rounded-md border '
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder={todoToEdit ? "Edit Todo..." : "Add new Todo..."}
        ref={inputRef}
      />
      <button className='px-4 py-3 bg-violet-600 rounded-md text-white  shadow-lg transform active:scale-x-75 transition-transform mx-5 flex' type="submit">
        {todoToEdit ? 'Save' : 'Add'}
      </button>
    </form>
  );
}

export default InputTodo;
