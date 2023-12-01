import './App.css';
import PolovljenjeIntervala from './projects/polovljenjeIntervala';
import MetodaRegulaFalsi from './projects/metodaRegulaFalsi';
import { useEffect, useState } from 'react';
import Navbar from './projects/Navbar';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Objasnjenje from './projects/Naslov';
import functionPlot from 'function-plot'
import { derivative } from 'mathjs';

function App() {
  const [expression, setExpression] = useState("");
  const [izvod, setIzvod] = useState("");

  useEffect(() => {
    if(izvod){
      setIzvod(derivative(expression, "x"))
    }
  }, [expression])

  function handleChange(e) {
    setExpression(e.target.value);
  }

  function handleClick(input) {
    setExpression((prevExpression) => prevExpression + input);
  }

  function clearScreen() {
    setExpression("");
  }

  function backspace() {
    const newExpression = expression.slice(0, -1);
    setExpression(newExpression);
  }

  useEffect(() => {
    try {
      const parsedExpression = expression ? expression : "sin(x)";
      const parsedDerivative = izvod ? izvod : "cos(x)";
  
      functionPlot({
        target: '#graph',
        yAxis: { domain: [-9, 9] },
        tip: {
          renderer: function () {}
        },
        grid: true,
        data: [
          {
            fn: parsedExpression,
            derivative: {
              fn: parsedDerivative,
              updateOnMouseMove: true
            }
          }
        ]
      });
    } catch (error) {
      console.error("Error in function-plot:", error);
    }
  }, [expression, izvod]);

  return (
    <Router>
      <div className="App">
      <Navbar />
        <header className="App-header">
          <>
            <div className="calc-app">
              <div className="calc-body">
                <div className="input-section">
                  <input
                    className="screen"
                    type="text"
                    value={expression}
                    onChange={handleChange}
                  />
                </div>
                <div className="button-section">
                  <div className="numeric-pad">
                    {["1", "2", "3", "4", "5",
                      "6", "7", "8", "9", "0", "x"].map(
                        (input) => (
                          <button key={input}
                            onClick={() =>
                              handleClick(input)}>
                            {input}
                          </button>
                        )
                      )}
                    <button onClick={() =>
                      handleClick(".")}>,</button>
                  </div>
                  <div className="operators">
                    {[
                      "+",
                      "-",
                      "*",
                      "/",
                      "^",
                      "sqrt(",
                      "sin(",
                      "cos(",
                      "tan(",
                      "cbrt(",
                      "asin(",
                      "acos(",
                      "atan(",
                      "(",
                      ")",
                    ].map((input) => (
                      <button key={input}
                        onClick={() =>
                          handleClick(input)}>
                        {input}
                      </button>
                    ))}

                    <button onClick={() =>
                      handleClick("pi")}>Pi</button>
                    <button onClick={() =>
                      handleClick("fact(")}>Factorial</button>
                  </div>
                  <div className="control-buttons">
                    <button className="clear-button"
                      onClick={clearScreen}>
                      C
                    </button>
                    <button className="backspace-button"
                      onClick={backspace}>
                      del
                    </button>
                  </div>
                </div>
              </div>
              <div className="variables"></div>
            <div className='method-explanation'>
              <Routes>
                <Route path='/polovljenje' element={<Objasnjenje metoda="polovljenje" />} />
                <Route path='/regula-falsi' element={<Objasnjenje metoda="regula"/>} />
              </Routes>
            </div>
            </div>
          </>
          <div className='all-results'>
            <Routes>
              <Route path='/polovljenje' element={<PolovljenjeIntervala expression={expression} />} />
              <Route path='/regula-falsi' element={<MetodaRegulaFalsi expression={expression} />} />
            </Routes>
            <div id="graph">Function: {expression ? expression : 'sin(x)'}</div>
          </div>
        </header>
      </div>
    </Router>
  );
}

export default App;
