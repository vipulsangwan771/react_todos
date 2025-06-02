import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddTodo = ({ addTodo }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [completed, setCompleted] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim() || !description.trim()) {
            toast.error('Please fill in all fields');
            return;
        };
        const newTodo = {
            id: Date.now(),
            title,
            description,
            completed,
        };

        addTodo(newTodo);
        setTitle('');
        setDescription('');
        setCompleted(false);
        navigate('/todos');
    };

    return (
        <div className="container my-5" style={{ minHeight: '80vh' }}>
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card shadow-sm">
                        <div className="card-body p-4 pb-5">
                            <h4 className="card-title mb-4 text-center">Add a New Todo</h4>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Todo Title</label>
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
                                    <label htmlFor="description" className="form-label">Description</label>
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
                                    <label className="form-check-label" htmlFor="completed">Mark as completed</label>
                                </div>

                                <div className='d-flex justify-content-end align-items-center gap-3'>
                                    <Link to="/todos">
                                        <button type="button" className="btn shadow-none btn-secondary">
                                            Cancel
                                        </button>
                                    </Link>

                                    <button type="submit" className="btn shadow-none btn-success">
                                        Add Todo
                                    </button>
                                </div>

                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddTodo;
