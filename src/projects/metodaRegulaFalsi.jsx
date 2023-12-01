import React, { useState } from "react";

const MetodaRegulaFalsi = () => {
  const [a, setA] = useState();
  const [b, setB] = useState();
  const [funct, setFunct] = useState();
  const [preciznost, setPreciznost] = useState();
  const [decimals, setDecimals] = useState();
  const [iterations, setIterations] = useState([]);
  const [finalResult, setFinalResult] = useState(null);

  const handleCalculateClick = () => {
    const iterationsResult = polovljenjeIntervala();
    setIterations(iterationsResult);

    if (iterationsResult.length > 0) {
      setFinalResult(iterationsResult[iterationsResult.length - 1].c);
    } else {
      setFinalResult(null);
    }
  };

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
    let c = bVal-((bVal-aVal)/(fb-fa))*fb;
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
          <input type="number" value={preciznost} onChange={(e) => setPreciznost(Number(e.target.value))} />
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
              <th>xi</th>
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
      <div>
        {finalResult !== null && (
          <div>
            <h3>Finalni rezultat:</h3>
            <p>{`xi: ${finalResult}`}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MetodaRegulaFalsi;
