import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TodoItem from './TodoItem';

const Todos = (props) => {
  const [filter, setfilter] = useState("all");
  const [search, setSearch] = useState("");

  const filterTodos = props.todos.filter(todo => {
    if (filter === "completed") return !!todo.completed;
    if (filter === "incomplete") return !todo.completed;
    return true;
  })
    .filter((todo) => {
      return todo.title.toLowerCase().includes(search.toLowerCase()) ||
        todo.description.toLowerCase().includes(search.toLowerCase());
    });


  return (
    <div className="container my-4" style={{ minHeight: '85vh' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Todo List</h3>
        <Link to="/addtodo" className="btn btn-primary btn-sm shadow-none" >Add Todo</Link>
      </div>
      <div className="d-flex justify-content-center mb-4">
        <div className="input-group w-50">
          <input
            type="text"
            className="form-control shadow-none"
            placeholder="Search todos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)} />
          <button
            className="btn btn-outline-secondary shadow-none"
            type="button"
            onClick={() => setSearch('')}>
            Clear
          </button>
        </div>
      </div>

      <div className="d-flex justify-content-center  mb-4">
        <ul className="nav nav-pills gap-2 border border-primary py-2  px-2" style={{ borderRadius: '32px', }}>
          <li className="nav-item ">
            <button
              className={`nav-link btn btn btn-sm shadow-none ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setfilter('all')}
              style={{ borderRadius: '32px', }}  >
              All
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link btn  btn btn-sm ${filter === 'completed' ? 'active' : ''}`}
              style={{ borderRadius: '32px', boxShadow: 'none', }} onClick={() => setfilter('completed')}
            >
              Completed
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link btn btn-sm ${filter === 'incomplete' ? 'active' : ''}`}
              style={{ borderRadius: '32px', boxShadow: 'none', }} onClick={() => setfilter('incomplete')}
            >
              Incomplete
            </button>
          </li>
        </ul>
      </div>


      <div className="row">
        {filterTodos.length > 0 ? (
          [...filterTodos]
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map(todo => (
              <div key={todo._id} className="col-12 col-md-6 col-lg-6  col-xl-4 mb-4">
                <div className="card h-100 shadow-sm hover-shadow">
                  <div className="card-body">
                    <TodoItem
                      filter={filter}
                      key={todo._id}
                      todo={todo}
                      onDelete={props.onDelete}
                      onToggle={props.onToggle}
                    />
                  </div>
                </div>
              </div>
            ))
        ) : (
          <div className="col-12">
            <div className="border rounded-2 bg-light-subtle py-5 px-4 text-center shadow-sm">
              <div className="text-primary mb-3">
                <i className="bi bi-clipboard-x" style={{ fontSize: '2.5rem' }}></i>
              </div>
              <h5 className="text-dark mb-2">No Todos Available</h5>
              <p className="text-muted mb-0">
                You currently have no tasks in this filter view. Try adding a new one or changing the filter.
              </p>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default Todos;
