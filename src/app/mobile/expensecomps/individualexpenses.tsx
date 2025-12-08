import { useContext, useState } from "react";
import { ExpenseContext, IIndividualExpense } from "./expense";
import IndividualExpenseAdder from "./individualexpenseadder";

export default function IndividualExpenses() {
  const { parties } = useContext(ExpenseContext);
  const [partyIndex, setPartyIndex] = useState(0);
  const increment = () => {
    if (partyIndex + 1 !== parties.length) {
      setPartyIndex(partyIndex + 1);
    } else {
      setPartyIndex(0);
    }
  };
  const decrement = () => {
    if (partyIndex !== 0) {
      setPartyIndex(partyIndex - 1);
    } else {
      setPartyIndex(parties.length - 1);
    }
  };
  return (
    <div id="border" className={"flex flex-col h-full"}>
      {parties.length > 0 ? (
        <>
          <h1 id="border" className={"text-center flex justify-between"}>
            <div
              id="border"
              className={"w-6 h-6 flex items-center justify-center font-bold"}
              onClick={decrement}
            >
              {"<"}
            </div>
            {parties[partyIndex].name} Individual Expenses
            <div
              id="border"
              className={"w-6 h-6 flex items-center justify-center font-bold"}
              onClick={increment}
            >
              {">"}
            </div>
          </h1>
          <IndividualExpenseAdder partyIndex={partyIndex} />

          {parties[partyIndex].individualExpenses && (
            <div id="border" className={"h-full"}>
              {parties[partyIndex].individualExpenses.map(
                (expense: IIndividualExpense) => {
                  return (
                    <div
                      className={"flex flex-row"}
                      key={JSON.stringify(expense)}
                    >
                      <input
                        disabled
                        className={"w-1/2"}
                        type="text"
                        value={expense.title}
                      ></input>
                      <input
                        disabled
                        className={"w-1/2"}
                        type="number"
                        value={expense.cost}
                      ></input>
                    </div>
                  );
                },
              )}
            </div>
          )}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
