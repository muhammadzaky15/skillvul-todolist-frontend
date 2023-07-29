// src/redux/todoSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const todoListUrl = import.meta.env.VITE_TODOLIST_URL;

const initialState = {
  todos: [],
  status: "idle",
  error: null
};

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await fetch(`${todoListUrl}/v1/todolist`);
  const data = await response.json();
  return data.data;
});

export const addTodoAsync = createAsyncThunk(
  "todos/addTodoAsync",
  async (payload) => {
    const response = await fetch(`${todoListUrl}/v1/todolist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: payload.title }),
    });
    const data = await response.json();
    return data;
  }
);

export const deleteTodoAsync = createAsyncThunk(
  "todos/deleteTodoAsync",
  async (todoId) => {
    const response = await fetch(`${todoListUrl}/v1/todolist/${todoId}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  }
);

export const editTodoAsync = createAsyncThunk(
  "todos/editTodoAsync",
  async (payload) => {
    const response = await fetch(`http://localhost:3000/v1/todolist/${payload.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        title: payload.title,
        completed: payload.completed
       }),
    });
    const data = await response.json();
    return data;
  }
);

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
    editTodo: (state, action) => {
      const { id, title } = action.payload;
      const todo = state.todos.find(todo => todo.id === id);
      if (todo) {
        todo.title = title;
      }
    },
    toggleTodo: (state, action) => {
      const { id } = action.payload;
      const todo = state.todos.find(todo => todo.id === id);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTodos.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = "success";
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error.message;
      })
      .addCase(addTodoAsync.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(deleteTodoAsync.fulfilled, (state, action) => {
        const { id } = action.payload;
        state.todos = state.todos.filter(todo => todo.id !== id);
      })
      .addCase(editTodoAsync.fulfilled, (state, action) => {
        const { id, title, completed } = action.payload;
        const todo = state.todos.find(todo => todo.id === id);
        if (todo) {
          todo.title = title;
          todo.completed = completed;
        }
      });
  }
});

export const { addTodo, deleteTodo, editTodo, toggleTodo } = todoSlice.actions;
export default todoSlice.reducer;

export const selectTodos = state => state.todos.todos;
