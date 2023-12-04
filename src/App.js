import './App.css';
import { useEffect, useState } from 'react';
import Navbar from './projects/Navbar';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Objasnjenje from './projects/Naslov';
import functionPlot from 'function-plot'
import { derivative, parse } from 'mathjs';
import MetodeNaZatvorenom from './projects/MetodeNaZatvorenom';
import MetodeNaOtvorenom from './projects/MetodeNaOtvorenom';

function App() {
  const [expression, setExpression] = useState("");
  const [izvod, setIzvod] = useState("");

  useEffect(() => {
    try {
      const parsedExpression = expression ? expression.replace(/e/g, 2.718281828459045) : "sin(x)";
      const parsedDerivative = derivative(parse(parsedExpression), 'x', { simplify: true }).toString();

      setIzvod(parsedDerivative);
    } catch (err) {
      console.error(err);
    }
  }, [expression]);

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
      const parsedExpression = expression ? expression.replace(/e/g, 'Math.exp(1)') : "sin(x)";
      const parsedDerivative = izvod ? izvod : "cos(x)";

      functionPlot({
        target: '#test',
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
                      handleClick("e")}>e</button>
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
                <Route path='/prosta-iteracija' element={<Objasnjenje metoda="prosta-iteracija"/>} />
              </Routes>
            </div>
            </div>
          </>
          <div className='all-results'>
            <Routes>
              <Route path='/polovljenje' element={<MetodeNaZatvorenom expression={expression} method={"bisection"} />} />
              <Route path='/regula-falsi' element={<MetodeNaZatvorenom expression={expression} method={"regulafalsi"} />} />
              <Route path='/prosta-iteracija' element={<MetodeNaOtvorenom expression={expression} derivative={izvod} method={"prosta-iteracija"}/>} />
              <Route path='/newton' element={<MetodeNaOtvorenom expression={expression} derivative={izvod} method={"newton"}/>} />
              <Route path='/modifikovan-newton' element={<MetodeNaOtvorenom expression={expression} derivative={izvod} method={"modifikovana-newtonova"}/>} />
            </Routes>
            <div id="test">function: {expression ? expression : 'sin(x)'}</div>
          </div>
        </header>
      </div>
    </Router>
  );
}

export default App;
