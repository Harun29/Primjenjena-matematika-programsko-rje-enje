import React, { useEffect, useState } from "react";
import useCalculator from "../hooks/CalculateHook";

const MetodeNaZatvorenom = ({ expression, method }) => {
  const { calculate } = useCalculator();
  const [a, setA] = useState();
  const [b, setB] = useState();
  const [funct, setFunct] = useState();
  const [preciznost, setPreciznost] = useState();
  const [decimals, setDecimals] = useState();
  const [iterations, setIterations] = useState([]);
  const [finalResult, setFinalResult] = useState(null);

  useEffect(() => {
    setFunct(expression);
  }, [expression])

  const handleCalculateClick = (e) => {
    e.preventDefault();
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

    let fa = calculate(funct.replace(/x/g, a));
    let fb = calculate(funct.replace(/x/g, b));

    if (fa * fb >= 0) {
      console.error("Interval nije ispravno odabran.");
      return result;
    }

    let aVal = a;
    let bVal = b;
    let c;
    if(method === "bisection"){
      c = (aVal + bVal) / 2;
    }else{
      c = bVal - ((bVal - aVal) / (fb - fa)) * fb;
    }
    let fc = calculate(funct.replace(/x/g, c));
    let previousC = c;
    let count = 0;

    while (Math.abs(c - previousC) > preciznost || count === 0) {
      result.push({
        a: aVal.toFixed(decimals),
        fa: fa.toFixed(decimals),
        b: bVal.toFixed(decimals),
        fb: fb.toFixed(decimals),
        c: c.toFixed(decimals),
        difference: count === 0 ? "-" : (c - previousC).toFixed(decimals)
      });

      count += 1;

      if (fa * fc < 0) {
        bVal = c;
        fb = calculate(funct.replace(/x/g, bVal));
      } else {
        aVal = c;
        fa = calculate(funct.replace(/x/g, aVal));
      }

      previousC = c;
      if(method === "bisection"){
        c = (aVal + bVal) / 2;
      }else{
        c = bVal - ((bVal - aVal) / (fb - fa)) * fb;
      }
      fc = calculate(funct.replace(/x/g, c));
    }

    result.push({
      a: aVal.toFixed(decimals),
      fa: fa.toFixed(decimals),
      b: bVal.toFixed(decimals),
      fb: fb.toFixed(decimals),
      c: c.toFixed(decimals),
      difference: (c - previousC).toFixed(decimals)
    });

    return result;
  };

  return (
    <div className="calculator-container">
      <h3>Rezultati iteracija:</h3>
      <div className="calculator-container-plus">
      <form onSubmit={handleCalculateClick} className="form-section">
        <div className="form-item">
          <label>
            a:
            <input
              required
              type="text"
              onChange={(e) => setA(Number(e.target.value))}
              className="form-input"
            />
          </label>
        </div>
        <div className="form-item">
          <label>
            b:
            <input
              required
              type="text"
              onChange={(e) => setB(Number(e.target.value))}
              className="form-input"
            />
          </label>
        </div>
        <div className="form-item">
          <label>
            Funkcija:
            <input
              required
              type="text"
              value={funct}
              onChange={(e) => setFunct(e.target.value)}
              disabled
              className="form-input-disabled"
            />
          </label>
        </div>
        <div className="form-item">
          <label>
            Preciznost:
            <input
              placeholder="Npr. 0.001"
              required
              type="text"
              onChange={(e) => setPreciznost(Number(e.target.value))}
              className="form-input"
            />
          </label>
        </div>
        <div className="form-item">
          <label>
            Decimalna mesta:
            <input
              required
              type="number"
              value={decimals}
              onChange={(e) => setDecimals(Number(e.target.value))}
              className="form-input"
            />
          </label>
        </div>
        <div className="form-item">
          <button type="submit" className="calculate-button">
            Izračunaj
          </button>
        </div>
      </form>
      <div className="results-section">
        <table className="results-table">
          <thead>
            <tr>
              <th>Iteracija</th>
              <th>a</th>
              <th>fa</th>
              <th>b</th>
              <th>fb</th>
              {method === "bisection" ? <th>c</th> : <th>xi</th>}
              <th>Razlika</th>
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
                <td>{iteration.difference}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="final-result">
          {finalResult !== null && (
            <div>
              <h3>Finalni rezultat:</h3>
              <p>{method === "bisection" ? `c: ${finalResult}` : `xi: ${finalResult}`}</p>
            </div>
          )}
        </div>
      </div>
      </div>
    </div>

  );
};

export default MetodeNaZatvorenom;
