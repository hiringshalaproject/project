import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <>
      <h1>Admin Dashboard</h1>


      <div className="card-group" style={{ width: '18rem', marginLeft: '20px' }}>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Add a Job</h5>
            <p className="card-text">
              <Link to="/add">
                <button type="submit" className="btn btn-success btn-lg mb-1">
                  Add
                </button>
              </Link>
            </p>
          </div>
        </div>

      </div>
      <div className="card" style={{ width: '18rem', marginTop: '20px', marginLeft: '20px' }}>
        <div className="card-body">
          <h5 className="card-title">Get Details of All Job</h5>
          <p className="card-text">
            <Link to="/getJobs">
              <button type="submit" className="btn btn-success btn-lg mb-1">
                GET
              </button>
            </Link>
          </p>
        </div>

      </div>

      <div className="card" style={{ width: '18rem', marginTop: '20px', marginLeft: '20px' }}>
        <div className="card-body">
          <h5 className="card-title">Get Details of All Seekers</h5>
          <p className="card-text">
            <Link to="/getSeekers">
              <button type="submit" className="btn btn-success btn-lg mb-1">
                GET
              </button>
            </Link>
          </p>
        </div>

      </div>

      <div className="card" style={{ width: '18rem', marginTop: '20px', marginLeft: '20px' }}>
        <div className="card-body">
          <h5 className="card-title">Add a Seeker</h5>
          <p className="card-text">
            <Link to="/addSeeker">
              <button type="submit" className="btn btn-success btn-lg mb-1">
                Add
              </button>
            </Link>
          </p>
        </div>

      </div>

      <div className="card" style={{ width: '18rem', marginTop: '20px', marginLeft: '20px' }}>
        <div className="card-body">
          <h5 className="card-title">Add a Employee</h5>
          <p className="card-text">
            <Link to="/addEmployee">
              <button type="submit" className="btn btn-success btn-lg mb-1">
                Add
              </button>
            </Link>
          </p>
        </div>

      </div>


      <div className="card" style={{ width: '18rem', marginTop: '20px', marginLeft: '20px' }}>
        <div className="card-body">
          <h5 className="card-title">Get All Employees</h5>
          <p className="card-text">
            <Link to="/getEmployee">
              <button type="submit" className="btn btn-success btn-lg mb-1">
                GET
              </button>
            </Link>
          </p>
        </div>

      </div>


    </>
  );
}

export default LandingPage;
