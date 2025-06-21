import React from 'react';
import { ClipboardList } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container-fluid py-5 bg-light" style={{ minHeight: '100vh' }}>
      {/* Hero Section */}
      <div className="container text-center mb-5">
        <div className="mb-3">
          <ClipboardList size={48} className="text-primary" />
        </div>
        <h1 className="display-4 fw-bold">Todo App That Organizes Your Life</h1>
        <p className="lead text-muted mx-auto" style={{ maxWidth: '600px' }}>
          Manage your time like a pro. Create, organize, and conquer your tasks with a smart interface built for focus and flow.
        </p>
        <Link to="/todos" className="btn btn-primary btn-lg mt-4 px-4">
          Get Started
        </Link>
      </div>

      {/* Features Section */}
      <div className="container">
        <div className="row g-4">
          <div className="col-md-6">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title text-primary">📋 What is this App?</h5>
                <p className="card-text text-muted">
                  A minimal, fast, and flexible task manager designed for people who want clarity over clutter. It’s your daily companion to win the day.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title text-primary">⚙️ How it Works</h5>
                <ul className="list-unstyled text-muted">
                  <li>✅ Tap <strong>"Add Todo"</strong> to create a task.</li>
                  <li>📌 Track your progress visually with instant feedback.</li>
                  <li>🗑️ Mark tasks done or delete them with a click.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-md-12">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title text-primary">🚀 Why Use This App?</h5>
                <ul className="list-unstyled text-muted">
                  <li>🎯 Crystal-clear task visibility</li>
                  <li>📈 Habit-building for long-term success</li>
                  <li>💡 Minimal UI = less distraction, more action</li>
                  <li>🔔 Smart notifications keep you on track</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-md-12">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title text-primary">💡 Pro Tip</h5>
                <p className="text-muted">
                  Start your morning by selecting the 3 most important tasks. Focus on finishing those before anything else — it builds momentum for the day.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quote + CTA */}
        <div className="text-center mt-5">
          <blockquote className="blockquote text-secondary fst-italic">
            "Discipline is choosing between what you want now and what you want most."
          </blockquote>
          <Link to="/todos" className="btn btn-outline-primary mt-4 px-4">
            View My Tasks
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
