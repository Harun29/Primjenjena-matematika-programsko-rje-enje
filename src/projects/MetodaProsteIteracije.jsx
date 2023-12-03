import React, { useEffect, useState } from "react";
import useCalculator from "../CalculateHook";

const ProstaIteracija = ({ expression }) => {
  const { calculate } = useCalculator();
  const [initialX, setInitialX] = useState();
  const [tolerance, setTolerance] = useState();
  const [decimalPlaces, setDecimalPlaces] = useState();
  const [iterations, setIterations] = useState([]);
  const [finalResult, setFinalResult] = useState(null);

  const handleCalculateClick = () => {
    const iterationsResult = simpleIteration();
    setIterations(iterationsResult);

    if (iterationsResult.length > 0) {
      setFinalResult(iterationsResult[iterationsResult.length - 1].xiPlus1);
    } else {
      setFinalResult(null);
    }
  };

  const simpleIteration = () => {
    let result = [];

    let xi = initialX;
    let xiPlus1 = calculate(expression.replace(/x/g, xi));
    let count = 0;

    while (Math.abs(xiPlus1 - xi) > tolerance || count === 0) {
      result.push({
        iteration: count + 1,
        xi: xi.toFixed(decimalPlaces),
        xiPlus1: xiPlus1.toFixed(decimalPlaces),
        difference: count === 0 ? "-" : (xiPlus1 - xi).toFixed(decimalPlaces),
      });

      count += 1;

      xi = xiPlus1;
      xiPlus1 = calculate(expression.replace(/x/g, xi));
    }

    result.push({
      iteration: count + 1,
      xi: xi.toFixed(decimalPlaces),
      xiPlus1: xiPlus1.toFixed(decimalPlaces),
      difference: (xiPlus1 - xi).toFixed(decimalPlaces),
    });

    return result;
  };

  return (
    <div className="calculator-container">
      <h3>Rezultati iteracija:</h3>
      <div className="calculator-container-plus">
        <div className="form-section">
          <div className="form-item">
            <label>
              Početna vrijednost x:
              <input
                type="number"
                value={initialX}
                onChange={(e) => setInitialX(Number(e.target.value))}
                className="form-input"
              />
            </label>
          </div>
          <div className="form-item">
            <label>
              Preciznost:
              <input
                type="number"
                value={tolerance}
                onChange={(e) => setTolerance(Number(e.target.value))}
                className="form-input"
              />
            </label>
          </div>
          <div className="form-item">
            <label>
              Decimalna mjesta:
              <input
                type="number"
                value={decimalPlaces}
                onChange={(e) => setDecimalPlaces(Number(e.target.value))}
                className="form-input"
              />
            </label>
          </div>
          <div className="form-item">
            <button onClick={handleCalculateClick} className="calculate-button">
              Izračunaj
            </button>
          </div>
        </div>
        <div className="results-section">
          <table className="results-table">
            <thead>
              <tr>
                <th>Iteracija</th>
                <th>xi</th>
                <th>xi+1</th>
                <th>Razlika</th>
              </tr>
            </thead>
            <tbody>
              {iterations.map((iteration, index) => (
                <tr key={index}>
                  <td>{iteration.iteration}</td>
                  <td>{iteration.xi}</td>
                  <td>{iteration.xiPlus1}</td>
                  <td>{iteration.difference}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="final-result">
            {finalResult !== null && (
              <div>
                <h3>Finalni rezultat:</h3>
                <p>{`xi+1: ${finalResult}`}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProstaIteracija;
