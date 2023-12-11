import "./navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <Link className="navbar-container" to={"/"}>
        <h1 className="name">accredian</h1>
      </Link>
    </>
  );
};

export default Navbar;
