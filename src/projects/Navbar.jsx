import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="header">
        <h1>PMIS</h1>
      </div>
      <div className="methods">
        <h2>Metode</h2>
        <ul>
          <Link to="/polovljenje">
            <li>
              Metoda Polovljenja Intervala
            </li>
          </Link>
          <Link to="/regula-falsi">
            <li>
              Metoda Regula Falsi
            </li>
          </Link>
          <Link to="/prosta-iteracija">
            <li>
              Metoda Proste Iteracije
            </li >
          </Link>
          <Link to="/newton-raphson">
            <li>
              Newton-Raphsonova Metoda
            </li>
          </Link>
          <Link to="/modifikovana-newtonova">
            <li>
              Modifikovana Newtonova Metoda
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
