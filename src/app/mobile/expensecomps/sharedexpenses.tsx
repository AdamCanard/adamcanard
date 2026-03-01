import { useContext } from "react";
import { ExpenseContext } from "./expense";
import ExpenseDisplay from "./expensedisplay";
import AddSharedExpense from "./addsharedexpense";

export default function SharedExpenses() {
  const { party } = useContext(ExpenseContext);
  return (
    <>
      <AddSharedExpense />
      <div id="border">
        <div id="title" className={"flex justify-between"}>
          <>Shared Expenses:</>
        </div>
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
              <ExpenseDisplay key={JSON.stringify(expense)} expense={expense} />
            );
          })}
        </>
      </div>
    </>
  );
}
