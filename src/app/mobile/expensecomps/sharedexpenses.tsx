import { useContext, useState } from "react";
import { ExpenseContext } from "./expense";
import ExpenseDisplay from "./expensedisplay";
import AddSharedExpense from "./addsharedexpense";

export default function SharedExpenses() {
  const { party } = useContext(ExpenseContext);
  const [show, setShow] = useState(true);
  const toggleShow = () => {
    setShow(!show);
  };
  return (
    <>
      <AddSharedExpense />
      <div id="border">
        <div id="title" className={"flex justify-between"}>
          <>Shared Expenses:</>
          <button
            id="border"
            onClick={toggleShow}
            className={"flex h-full w-6 pr-2 bg-black justify-start items-end"}
          >
            <div className={"bg-black w-1/2 h-1/8"}></div>
          </button>
        </div>
        {show && (
          <>
            <div className={"flex flex-row"}>
              <div id="border" className={"w-1/2 text-center"}>
                Title:
              </div>
              <div id="border" className={"w-1/2 text-center"}>
                Monthly Cost:
              </div>
            </div>
            {party.partyExpenses.map((expense) => {
              return (
                <ExpenseDisplay
                  key={JSON.stringify(expense)}
                  expense={expense}
                />
              );
            })}
          </>
        )}
      </div>
    </>
  );
}
