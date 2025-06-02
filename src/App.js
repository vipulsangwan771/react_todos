import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client';
import Home from './Components/Home';
import Header from './Components/Header';
import Todo from './Components/TodoItem';
import Todoes from './Components/Todos';
import Footer from './Components/Footer';
import AddTodo from './Components/AddTodo';
import EditTodo from './Components/EditTodo';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

const socket = io(process.env.REACT_APP_API_URL, {
  reconnection: true,
  reconnectionAttempts: 5,
});

function App() {
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const suppressNextSocket = useRef({
    todoAdd: false,
    todoUpdate: false,
    todoDelete: false,
  });
  const processedEvents = useRef(new Set());
  const lastProcessed = useRef(new Map());

  // Dummy data
  const dummyTodos = [
    {
      _id: 'dummy1',
      title: 'Sample Todo 1',
      description: 'This is a sample todo item',
      isCompleted: false,
      createdAt: new Date().toISOString(),
      isDummy: true,
    },
    {
      _id: 'dummy2',
      title: 'Sample Todo 2',
      description: 'Another sample todo item',
      isCompleted: false,
      createdAt: new Date().toISOString(),
      isDummy: true,
    },
  ];

  // Helper function to remove duplicates by _id
  const removeDuplicates = (todos) => {
    const seen = new Set();
    return todos.filter((todo) => {
      if (seen.has(todo._id)) return false;
      seen.add(todo._id);
      return true;
    });
  };

  useEffect(() => {
    socket.on('connect', () => {});

    socket.on('todoAdd', (newTodo) => {
      const eventKey = newTodo._id + newTodo.createdAt;
      if (processedEvents.current.has(eventKey)) return;
      processedEvents.current.add(eventKey);
      setTodos((prevTodos) => {
        // Prevent adding duplicate _id
        if (prevTodos.some((todo) => todo._id === newTodo._id)) return prevTodos;
        const updatedTodos = [newTodo, ...prevTodos.filter((todo) => !todo.isDummy)];
        return removeDuplicates(updatedTodos);
      });
      if (!suppressNextSocket.current.todoAdd) {
        toast.success('New todo added', { toastId: `add-${newTodo._id}` });
      }
      suppressNextSocket.current.todoAdd = false;
    });

    socket.on('todoUpdate', (updatedTodo) => {
      const todoId = updatedTodo._id;
      const now = Date.now();
      const lastProcessedTime = lastProcessed.current.get(todoId) || 0;
      if (now - lastProcessedTime < 1000) return;
      lastProcessed.current.set(todoId, now);
      const eventKey = todoId + (updatedTodo.updatedAt || now);
      if (processedEvents.current.has(eventKey)) return;
      processedEvents.current.add(eventKey);
      setTodos((prevTodos) => {
        const updatedTodos = prevTodos.map((todo) =>
          todo._id === updatedTodo._id ? updatedTodo : todo
        );
        return removeDuplicates(updatedTodos);
      });
      if (!suppressNextSocket.current.todoUpdate) {
        toast.success('Todo updated', { toastId: `update-${updatedTodo._id}` });
      }
      suppressNextSocket.current.todoUpdate = false;
    });

    socket.on('todoDelete', (id) => {
      const eventKey = id + Date.now();
      if (processedEvents.current.has(eventKey)) return;
      processedEvents.current.add(eventKey);
      setTodos((prevTodos) => {
        const newTodos = prevTodos.filter((todo) => todo._id !== id);
        return newTodos.length === 0 || newTodos.every((todo) => todo.isDummy)
          ? [...dummyTodos]
          : removeDuplicates(newTodos);
      });
      if (!suppressNextSocket.current.todoDelete) {
        toast.success('Todo deleted', { toastId: `delete-${id}` });
      }
      suppressNextSocket.current.todoDelete = false;
    });

    socket.on('reconnect', () => {});

    const interval = setInterval(() => {
      processedEvents.current.clear();
      lastProcessed.current.clear();
    }, 60000);

    return () => {
      clearInterval(interval);
      socket.off('connect');
      socket.off('todoAdd');
      socket.off('todoUpdate');
      socket.off('todoDelete');
      socket.off('reconnect');
    };
  }, []);

  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/todos`);
        const realTodos = response.data;
        const uniqueTodos = removeDuplicates(realTodos);
        setTodos(uniqueTodos.length > 0 ? uniqueTodos : dummyTodos);
      } catch (error) {
        setError('Failed to fetch todos');
        toast.error('Failed to fetch todos', { toastId: 'fetch-error' });
        setTodos(dummyTodos);
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, []);

  const addTodo = async (newTodo) => {
    try {
      suppressNextSocket.current.todoAdd = true;
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/todos`, newTodo);
      setTodos((prevTodos) => {
        const updatedTodos = [response.data, ...prevTodos.filter((todo) => !todo.isDummy)];
        return removeDuplicates(updatedTodos);
      });
      toast.success('Todo created successfully', { toastId: `add-${response.data._id}` });
    } catch (err) {
      toast.error('Error adding todo', { toastId: 'add-error' });
      console.error(err.message);
    } finally {
      setTimeout(() => {
        suppressNextSocket.current.todoAdd = false;
      }, 1000);
    }
  };

  const updateTodo = async (updatedTodo) => {
    try {
      suppressNextSocket.current.todoUpdate = true;
      await axios.put(`${process.env.REACT_APP_API_URL}/api/todos/${updatedTodo._id}`, updatedTodo);
      toast.success('Todo updated successfully', { toastId: `update-${updatedTodo._id}` });
    } catch (err) {
      toast.error('Error updating todo', { toastId: `update-error-${updatedTodo._id}` });
      console.error(err.message);
    } finally {
      setTimeout(() => {
        suppressNextSocket.current.todoUpdate = false;
      }, 1000);
    }
  };

  const onDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        suppressNextSocket.current.todoDelete = true;
        await axios.delete(`${process.env.REACT_APP_API_URL}/api/todos/${id}`);
        setTodos((prevTodos) => {
          const newTodos = prevTodos.filter((todo) => todo._id !== id);
          return newTodos.length === 0 || newTodos.every((todo) => todo.isDummy)
            ? [...dummyTodos]
            : removeDuplicates(newTodos);
        });
        Swal.fire('Deleted!', 'Your todo has been deleted.', 'success');
      } catch (err) {
        Swal.fire('Error!', 'There was an error deleting the todo.', 'error');
        toast.error('Error deleting todo', { toastId: `delete-error-${id}` });
        console.error(err.message);
      } finally {
        setTimeout(() => {
          suppressNextSocket.current.todoDelete = false;
        }, 1000);
      }
    }
  };

  const handleToggle = async (id) => {
    try {
      suppressNextSocket.current.todoUpdate = true;
      await axios.patch(`${process.env.REACT_APP_API_URL}/api/todos/${id}`);
      toast.success('Todo status updated', { toastId: `toggle-${id}` });
    } catch (err) {
      toast.error('Error toggling todo', { toastId: `toggle-error-${id}` });
      console.error(err.message);
    } finally {
      setTimeout(() => {
        suppressNextSocket.current.todoUpdate = false;
      }, 1000);
    }
  };

  // Function to handle imported data
  const handleImportData = async (importedTodos) => {
    try {
      setLoading(true);
      const uniqueImportedTodos = removeDuplicates(importedTodos);
      // Optionally, you can post imported todos to the backend
      for (const todo of uniqueImportedTodos) {
        await axios.post(`${process.env.REACT_APP_API_URL}/api/todos`, todo);
      }
      setTodos((prevTodos) => {
        const updatedTodos = [...uniqueImportedTodos, ...prevTodos.filter((todo) => !todo.isDummy)];
        return removeDuplicates(updatedTodos);
      });
      toast.success('Data imported successfully', { toastId: 'import-success' });
    } catch (err) {
      toast.error('Error importing data', { toastId: 'import-error' });
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Router>
        <Header title="To Do List" searchBar={false} />
        {loading && (
          <div
            className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center"
            style={{ zIndex: 1050 }}
          >
            <div className="bg-white p-4 rounded shadow text-center d-flex flex-column align-items-center">
              <div
                className="spinner-border text-primary"
                role="status"
                style={{ width: '3rem', height: '3rem' }}
              >
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3 text-muted mb-0">Loading...</p>
            </div>
          </div>
        )}
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addtodo" element={<AddTodo addTodo={addTodo} />} />
          <Route path="/todo/:id" element={<Todo />} />
          <Route
            path="/todos"
            element={<Todoes todos={todos} onDelete={onDelete} onToggle={handleToggle} />}
          />
          <Route path="/edit/:id" element={<EditTodo onUpdate={updateTodo} />} />
        </Routes>
        <Footer />
      </Router>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop />
    </>
  );
}

export default App;