import React, { useEffect, useState } from "react";
import useCalculator from "../hooks/CalculateHook";
import { useRef } from "react";

const MetodeNaOtvorenom = ({ expression, derivative, method }) => {
  const { calculate } = useCalculator();
  const [funct, setFunct] = useState(expression);
  const [initialX, setInitialX] = useState();
  const [preciznost, setPreciznost] = useState();
  const [decimals, setDecimals] = useState();
  const [iterations, setIterations] = useState([]);
  const [finalResult, setFinalResult] = useState(null);
  const [infinity, setInfinity] = useState(false);

  const expressionRef = useRef(expression);

  useEffect(() => {
    expressionRef.current = expression;
    setFunct(expression);
  }, [expression]);

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
    let expressionValue = calculate(expression.replace(/x/g, xi))
    let derivativeValue = calculate(derivative.replace(/x/g, xi))
    let xiPlus1;
    if(method === "newton" || method === "modifikovana-newtonova"){
      xiPlus1 = calculate(`${xi}-(${expressionValue}/${derivativeValue})`);
    }else{
      xiPlus1 = expressionValue;
      console.log("type of xiPlus1: ",typeof(xiPlus1))
    }
    let count = 0;
    
    while ((Math.abs(xiPlus1 - xi) > preciznost || count === 0)  &&  typeof(xiPlus1) == "number") {
      result.push({
        iteration: count + 1,
        xi: xi.toFixed(decimals),
        fx: expressionValue.toFixed(decimals),
        difference: count === 0 ? "-" : (xiPlus1 - xi).toFixed(decimals),
      });
      
      count += 1;
      
      xi = xiPlus1;
      expressionValue = calculate(expression.replace(/x/g, xi))
      if(method === "newton"){
        derivativeValue = calculate(derivative.replace(/x/g, xi))
      }if(method === "modifikovana-newtonova" || method === "newton"){
        xiPlus1 = calculate(`${xi}-(${expressionValue}/${derivativeValue})`);
      }else{
        xiPlus1 = expressionValue;
      }
    }
    
    if(typeof(xiPlus1) == "number"){
      result.push({
        iteration: count + 1,
        xi: xi.toFixed(decimals),
        fx: expressionValue.toFixed(decimals),
        difference: (xiPlus1 - xi).toFixed(decimals),
      });
    }else{
      setInfinity(true)
    }

    return result;
  };

  return (
    <form className="calculator-container">
      <h3>Rezultati iteracija:</h3>
      <div className="calculator-container-plus">
        <div className="form-section">
          <div className="form-item">
            <label>
              Početna vrijednost x:
              <input
                required
                type="number"
                value={initialX}
                onChange={(e) => setInitialX(Number(e.target.value))}
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
                type="number"
                value={preciznost}
                onChange={(e) => setPreciznost(Number(e.target.value))}
                className="form-input"
              />
            </label>
          </div>
          <div className="form-item">
            <label>
              Decimalna mjesta:
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
                <th>f(x)</th>
                <th>Razlika</th>
              </tr>
            </thead>
            <tbody>
              {iterations.map((iteration, index) => (
                <tr key={index}>
                  <td>{iteration.iteration}</td>
                  <td>{iteration.xi}</td>
                  <td>{iteration.fx}</td>
                  <td>{iteration.difference}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="final-result">
            {finalResult !== null && (
              <div>
                <h3>Finalni rezultat:</h3>
                {infinity ? <p>divergira</p>:
                <p>{`xi+1: ${finalResult}`}</p>}
              </div>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

export default MetodeNaOtvorenom;
