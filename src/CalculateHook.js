import { useState } from 'react';
import * as math from 'mathjs';

const useCalculator = () => {
  const [screenVal, setScreenVal] = useState('');

  const calculate = (expression) => {
    try {
      const allVariables = {
        pi: Math.PI,
        e: Math.E,
        fact: math.factorial,
        sin: Math.sin,
        cos: Math.cos,
        tan: Math.tan,
        asin: Math.asin,
        acos: Math.acos,
        atan: Math.atan,
      };

      const result = math.evaluate(expression, allVariables);
      if (typeof result === "number" && !isNaN(result)) {
        setScreenVal(Number(result).toFixed(4));
      } else {
        setScreenVal("Error: Invalid expression");
      }
    } catch (error) {
      setScreenVal("Error: Invalid expression");
    }
  };

  return { screenVal, calculate };
};

export default useCalculator;
