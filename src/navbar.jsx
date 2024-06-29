import "./navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <div className="navbar-container">
        <div className="navbar-item">
          <Link to="/city" className="navbar-link">
            City
          </Link>
          <br />
          <Link to="/cars" className="navbar-link">
            Cars
          </Link>{" "}
          <br />
          <Link to="/parol" className="navbar-link">
            Location
          </Link>{" "}
          <br />
          <Link to="/catigories" className="navbar-link">
            Catigories
          </Link>{" "}
          <br />
          <Link to="/model" className="navbar-link">
            Model
          </Link>{" "}
          <br />
          <Link to="/brend" className="navbar-link">
            Brend
          </Link>{" "}
          <br />
        </div>
      </div>
    </>
  );
}

export default Navbar;
