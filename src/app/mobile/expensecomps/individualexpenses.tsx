import { useContext, useState } from "react";
import { ExpenseContext, IExpense } from "./expense";
import IndividualExpenseAdder from "./individualexpenseadder";
import ExpenseDisplay from "./expensedisplay";

export default function IndividualExpenses() {
  const { parties, sharedCost } = useContext(ExpenseContext);
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

  const individualCost = () => {
    let totalIndividualCost = 0;
    if (parties[partyIndex].individualExpenses) {
      for (let i = 0; i < parties[partyIndex].individualExpenses.length; i++) {
        totalIndividualCost += parties[partyIndex].individualExpenses[i].cost;
      }
    }
    return totalIndividualCost;
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
          <div className={"flex flex-row"}>
            <>
              {" "}
              <div id="border">Income After Shared Expenses:</div>
              <div id="border">
                {parties[partyIndex].takeHome - sharedCost()}
              </div>
            </>
          </div>
          <IndividualExpenseAdder partyIndex={partyIndex} />

          {parties[partyIndex].individualExpenses && (
            <>
              <div id="border">
                {parties[partyIndex].individualExpenses.map(
                  (expense: IExpense) => {
                    return (
                      <ExpenseDisplay
                        key={JSON.stringify(expense)}
                        expense={expense}
                      />
                    );
                  },
                )}
              </div>
              <div className={"flex flex-row"}>
                <>
                  {" "}
                  <div id="border">Income After All Expenses:</div>
                  <div id="border">
                    {parties[partyIndex].takeHome -
                      sharedCost() -
                      individualCost()}
                  </div>
                </>
              </div>
            </>
          )}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
