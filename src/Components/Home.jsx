import React from 'react';

const Home = () => {
  return (
    <>
      <div className="container my-4 mb-5"  style={{ minHeight: '85vh', }}>
        <div className="text-center mb-5">
          <h1>Welcome to the Todo App!</h1>
          <p className="lead">Stay organized and keep track of your tasks efficiently.</p>
        </div>
        <div className="row">
          <div className="col-md-12 mb-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">What is this App?</h5>
                <p className="card-text">
                  This is a simple yet powerful Todo application to help you manage your tasks.
                  You can add, delete, and mark your tasks as completed with ease. Stay productive
                  and never forget what you need to do.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-12 mb-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">How it Works?</h5>
                <p className="card-text">
                  1. Add your tasks using the "Add Todo" button.<br />
                  2. View and track the status of each task.<br />
                  3. Delete tasks once completed or if no longer needed.<br />
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-5 " >
          <p className='mb-5'>
            Feel free to explore the other pages in the navigation bar to learn more or add your first task!
          </p>
        </div>

      </div>

    </>
  );
}

export default Home;
