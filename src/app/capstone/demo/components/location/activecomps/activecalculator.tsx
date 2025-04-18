"use client";

import { useState } from "react";

export default function ActiveCalculator() {
  const [calculatorStr, setCalculatorStr] = useState<string>("");

  const addToString = (value: string) => {
    const newCalculatorStr = calculatorStr + value;
    setCalculatorStr(newCalculatorStr);
  };

  const clear = () => {
    setCalculatorStr("");
  };

  const calculate = () => {
    try {
      const numbers = [];
      const operations = [];
      let currentNumber = [];
      let newNumber = 0;

      for (let i = 0; i < calculatorStr.length; i++) {
        if (isNaN(parseInt(calculatorStr[i]))) {
          operations.push(calculatorStr[i]);

          for (let j = 0; j < currentNumber.length; j++) {
            const tenth = currentNumber.length - (j + 1);
            newNumber += +currentNumber[j] * 10 ** tenth;
          }

          numbers.push(newNumber);
          currentNumber = [];
          newNumber = 0;
        } else {
          currentNumber.push(calculatorStr[i]);
        }
      }

      for (let j = 0; j < currentNumber.length; j++) {
        const tenth = currentNumber.length - (j + 1);
        newNumber += +currentNumber[j] * 10 ** tenth;
      }
      numbers.push(newNumber);
      currentNumber = [];

      pedmaser(numbers, operations);
    } catch (e: unknown) {
      console.log(e);
    }
  };

  const pedmaser = (numbers: number[], operations: string[]) => {
    let operationIndex;
    let operation;
    if (operations.length === 0) {
      setCalculatorStr(numbers[0] + "");
    }
    if (operations.includes("x") || operations.includes("/")) {
      const multiplyIndex = operations.findIndex(
        (operation) => operation === "x",
      );

      const divideIndex = operations.findIndex(
        (operation) => operation === "/",
      );
      if (multiplyIndex === -1) {
        operationIndex = divideIndex;
        operation = "/";
      } else if (divideIndex === -1) {
        operationIndex = multiplyIndex;
        operation = "x";
      } else if (multiplyIndex < divideIndex) {
        operationIndex = multiplyIndex;
        operation = "x";
      } else {
        operationIndex = divideIndex;
        operation = "/";
      }
      const firstNumber = numbers[operationIndex];
      const secondNumber = numbers[operationIndex + 1];
      let newNumber = 0;

      switch (operation) {
        case "x":
          newNumber = firstNumber * secondNumber;
          break;
        case "/":
          newNumber = firstNumber / secondNumber;
          break;
      }

      numbers[operationIndex] = newNumber;
      numbers.splice(operationIndex + 1, 1);
      operations.splice(operationIndex, 1);
      pedmaser(numbers, operations);
    }

    if (operations.includes("+") || operations.includes("-")) {
      const additionIndex = operations.findIndex(
        (operation) => operation === "+",
      );

      const subtractIndex = operations.findIndex(
        (operation) => operation === "-",
      );
      console.log(additionIndex, " ", subtractIndex);
      if (additionIndex === -1) {
        operationIndex = subtractIndex;
        operation = "-";
      } else if (subtractIndex === -1) {
        operationIndex = additionIndex;
        operation = "+";
      } else if (additionIndex < subtractIndex) {
        operationIndex = additionIndex;
        operation = "+";
      } else {
        operationIndex = subtractIndex;
        operation = "-";
      }
      const firstNumber = numbers[operationIndex];
      const secondNumber = numbers[operationIndex + 1];
      let newNumber = 0;

      switch (operation) {
        case "+":
          newNumber = firstNumber + secondNumber;
          break;
        case "-":
          newNumber = firstNumber - secondNumber;
          break;
      }

      numbers[operationIndex] = newNumber;
      numbers.splice(operationIndex + 1, 1);
      operations.splice(operationIndex, 1);
      pedmaser(numbers, operations);
    }
  };

  return (
    <>
      <div
        className={"h-24 border-2 w-full text-3xl flex items-end justify-end"}
      >
        {calculatorStr}
      </div>
      <div
        className={
          "w-full h-96 border-2 grid grid-flow-row grid-rows-4 grid-cols-4 "
        }
      >
        <CalculatorButton value="1" onClick={addToString} />
        <CalculatorButton value="2" onClick={addToString} />
        <CalculatorButton value="3" onClick={addToString} />
        <CalculatorButton value="+" onClick={addToString} />

        <CalculatorButton value="4" onClick={addToString} />
        <CalculatorButton value="5" onClick={addToString} />
        <CalculatorButton value="6" onClick={addToString} />
        <CalculatorButton value="-" onClick={addToString} />
        <CalculatorButton value="7" onClick={addToString} />
        <CalculatorButton value="8" onClick={addToString} />
        <CalculatorButton value="9" onClick={addToString} />
        <CalculatorButton value="x" onClick={addToString} />
        <button
          onClick={clear}
          className={
            "flex justify-center items-center text-4xl h-full w-full border-2 select-none"
          }
        >
          CA
        </button>
        <CalculatorButton value="0" onClick={addToString} />
        <button
          onClick={calculate}
          className={
            "flex justify-center items-center text-4xl h-full w-full border-2 select-none"
          }
        >
          =
        </button>
        <CalculatorButton value="/" onClick={addToString} />
      </div>
    </>
  );
}

function CalculatorButton(props: {
  value: string;
  onClick: (arg0: string) => void;
}) {
  return (
    <button
      onClick={() => props.onClick(props.value)}
      className={
        "flex justify-center items-center text-4xl h-full w-full border-2 select-none"
      }
    >
      {props.value}
    </button>
  );
}
