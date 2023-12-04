import * as math from 'mathjs';

const useCalculator = () => {

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
        return (Number(result));
      } else {
        return ("Error: Invalid expression");
      }
    } catch (error) {
      return ("Error: Invalid expression");
    }
  };

  return { calculate };
};

export default useCalculator;
