import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const EditTodo = ({ onUpdate }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/todos/${id}`);
        setTitle(response.data.title);
        setDescription(response.data.description);
        setCompleted(response.data.completed);
      } catch (err) {
        toast.error('Failed to load todo item', { toastId: `fetch-error-${id}` });
        console.error('Error fetching todo:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTodo();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      toast.error('Title and description are required', { toastId: 'validation-error' });
      return;
    }

    try {
      const updatedTodo = { _id: id, title, description, completed };
      await onUpdate(updatedTodo);
      navigate('/todos');
    } catch (err) {
      toast.error('Error updating todo', { toastId: `update-error-${id}` });
      console.error('Error updating todo:', err);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <div className="text-center">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-3 text-muted">Loading todo details...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container my-5" style={{ minHeight: '80vh' }}>
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card shadow-sm">
              <div className="card-body p-4 pb-5">
                <h4 className="card-title mb-4 text-center">Edit Todo</h4>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                      Todo Title
                    </label>
                    <input
                      type="text"
                      className="form-control shadow-none"
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Buy groceries"
                      aria-required="true"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      Description
                    </label>
                    <textarea
                      className="form-control shadow-none"
                      id="description"
                      rows="3"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Provide more details about the task"
                      aria-required="true"
                      required
                    ></textarea>
                  </div>
                  <div className="mb-3 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input shadow-none"
                      id="completed"
                      checked={completed}
                      onChange={(e) => setCompleted(e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="completed">
                      Mark as completed
                    </label>
                  </div>
                  <div className="d-flex justify-content-end align-items-center gap-3">
                    <Link to="/todos">
                      <button type="button" className="btn shadow-none btn-secondary">
                        Cancel
                      </button>
                    </Link>
                    <button type="submit" className="btn shadow-none btn-success">
                      Update Todo
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditTodo;