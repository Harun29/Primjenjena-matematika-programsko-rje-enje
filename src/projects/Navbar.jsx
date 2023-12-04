import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="header">
        <h1>PMIS</h1>
      </div>
      <div className="methods">
        <h2>Metode Na Zatvorenom Intervalu</h2>
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
        </ul>
        <h2>Metode Na Otvorenom Intervalu</h2>
        <ul>
          <Link to="/prosta-iteracija">
            <li>
              Metoda Proste Iteracije
            </li >
          </Link>
          <Link to="/newton">
            <li>
              Newton-Raphsonova Metoda
            </li>
          </Link>
          <Link to="/modifikovan-newton">
            <li>
              Modifikovana Newtonova Metoda
            </li>
          </Link>
        </ul>
      </div>
      <div className="signature">
        <p>Harun Ibrahimović</p>
        <a href="https://github.com/Harun29/Primjenjena-matematika-programsko-rjesenje">GitHub repo</a>
      </div>
    </div>
  );
};

export default Navbar;
