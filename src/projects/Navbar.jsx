import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="header">
        <h1>PMIS</h1>
      </div>
      <div className="methods">
        <h2>Methods</h2>
        <ul>
          <li>
            <Link to="/polovljenje">Metoda Polovljenja Intervala</Link>
          </li>
          <li>
            <Link to="/regula-falsi">Metoda Regula Falsi</Link>
          </li>
          <li>
            <Link to="/prosta-iteracija">Metoda Proste Iteracije</Link>
          </li>
          <li>
            <Link to="/newton-raphson">Newton-Raphsonova Metoda</Link>
          </li>
          <li>
            <Link to="/modifikovana-newtonova">Modifikovana Newtonova Metoda</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
