import React, { useState } from "react";
import "./App.css";

function Calculator() {
	const [expression, setExpression] = useState("");

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

	return (
		<>
			<div className="App">
				<div className="calc-body">
					<h1>Scientific Calculator</h1>
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
			</div>
		</>
	);
}

export default Calculator;
