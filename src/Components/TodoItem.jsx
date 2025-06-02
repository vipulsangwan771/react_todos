import React from 'react';
import { Link } from 'react-router-dom';

const TodoItem = ({ todo, onDelete, onToggle }) => {
  return (
    <div>
      <h5 className="card-title">{todo.title}</h5>
      <h6 className="card-title">{todo.description}</h6>
      <p className="card-text">
        Status:{' '}
        <span className={`badge ${todo.completed ? 'bg-success' : 'bg-warning'}`}>
          {todo.completed ? 'Completed' : 'In Complete'}
        </span>
      </p>

      <div className="d-flex justify-content-between mt-3">
        <button
          className="btn shadow-none btn-outline-primary btn-sm"
          onClick={() => onToggle(todo._id)}
        >
          {todo.completed ? 'Mark as Incomplete' : 'Mark as Completed'}
        </button>
        <Link to={`/edit/${todo._id}`}>
          <button className="btn shadow-none btn-outline-secondary btn-sm">Edit</button>
        </Link>
        <button
          className="btn btn-outline-danger shadow-none btn-sm"
          onClick={() => onDelete(todo._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
