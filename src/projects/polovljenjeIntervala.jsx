import React, { useState } from "react";

const BisectionMethod = () => {
  const [a, setA] = useState(1);
  const [b, setB] = useState(2);
  const [funct, setFunct] = useState("(x**2)-2");
  const [preciznost, setPreciznost] = useState(0.0001);
  const [decimals, setDecimals] = useState(4);
  const [iterations, setIterations] = useState([]);

  const polovljenjeIntervala = () => {
    let result = [];

    let fa = eval(funct.replace(/x/g, a));
    let fb = eval(funct.replace(/x/g, b));

    if (fa * fb >= 0) {
      console.error("Interval nije ispravno odabran.");
      return result;
    }

    let aVal = a;
    let bVal = b;
    let c = (aVal + bVal) / 2;
    let fc = eval(funct.replace(/x/g, c));

    while (Math.abs(fc) > preciznost) {
      result.push({
        a: aVal.toFixed(decimals),
        fa: fa.toFixed(decimals),
        b: bVal.toFixed(decimals),
        fb: fb.toFixed(decimals),
        c: c.toFixed(decimals),
        fc: fc.toFixed(decimals),
      });

      if (fa * fc < 0) {
        bVal = c;
      } else {
        aVal = c;
      }

      c = (aVal + bVal) / 2;
      fc = eval(funct.replace(/x/g, c));
    }

    // Dodaj poslednju iteraciju
    result.push({
      a: aVal.toFixed(decimals),
      fa: fa.toFixed(decimals),
      b: bVal.toFixed(decimals),
      fb: fb.toFixed(decimals),
      c: c.toFixed(decimals),
      fc: fc.toFixed(decimals),
    });

    return result;
  };

  const handleCalculateClick = () => {
    const iterationsResult = polovljenjeIntervala();
    setIterations(iterationsResult);
  };

  return (
    <div>
      <div>
        <label>
          a:
          <input type="number" value={a} onChange={(e) => setA(Number(e.target.value))} />
        </label>
      </div>
      <div>
        <label>
          b:
          <input type="number" value={b} onChange={(e) => setB(Number(e.target.value))} />
        </label>
      </div>
      <div>
        <label>
          Funkcija:
          <input type="text" value={funct} onChange={(e) => setFunct(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Preciznost:
          <input type="text" value={preciznost} onChange={(e) => setPreciznost(Number(e.target.value))} />
        </label>
      </div>
      <div>
        <label>
          Decimalna mesta:
          <input type="text" value={decimals} onChange={(e) => setDecimals(Number(e.target.value))} />
        </label>
      </div>
      <div>
        <button onClick={handleCalculateClick}>Izracunaj</button>
      </div>
      <div>
        <h3>Rezultati iteracija:</h3>
        <table>
          <thead>
            <tr>
              <th>Iteracija</th>
              <th>a</th>
              <th>fa</th>
              <th>b</th>
              <th>fb</th>
              <th>c</th>
              <th>fc</th>
            </tr>
          </thead>
          <tbody>
            {iterations.map((iteration, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{iteration.a}</td>
                <td>{iteration.fa}</td>
                <td>{iteration.b}</td>
                <td>{iteration.fb}</td>
                <td>{iteration.c}</td>
                <td>{iteration.fc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BisectionMethod;
