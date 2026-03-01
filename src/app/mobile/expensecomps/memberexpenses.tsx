import { useContext, useState } from "react";
import { ExpenseContext, IExpense } from "./expense";
import ExpenseDisplay from "./expensedisplay";
import AddMemberExpense from "./addmemberexpense";

export default function MemberExpenses() {
  const { party, sharedCost } = useContext(ExpenseContext);
  const [member, setMember] = useState(party.members[0]);
  if (party.members.length == 0) {
    return (
      <div
        id="border"
        className={"flex flex-col h-full justify-center items-center"}
      >
        <div id="border">Add Someone to your party first!</div>
      </div>
    );
  }
  const increment = () => {
    if (party.members.indexOf(member) + 2 > party.members.length) {
      setMember(party.members[0]);
    } else {
      setMember(party.members[party.members.indexOf(member) + 1]);
    }
  };
  const decrement = () => {
    if (party.members.indexOf(member) === 0) {
      setMember(party.members[party.members.length - 1]);
    } else {
      setMember(party.members[party.members.indexOf(member) - 1]);
    }
  };

  const individualCost = () => {
    let totalIndividualCost = 0;
    for (let i = 0; i < party.memberExpenses[member.name].length; i++) {
      totalIndividualCost += party.memberExpenses[member.name][i].cost;
    }
    return totalIndividualCost;
  };

  return (
    <div id="border" className={"flex flex-col "}>
      <h1 id="title" className={"text-center flex justify-between"}>
        <button
          id="border"
          className={
            "w-6 h-6 flex items-center justify-center font-bold text-black"
          }
          onClick={decrement}
        >
          {"<"}
        </button>
        {member.name} Individual Expenses
        <button
          id="border"
          className={
            "w-6 h-6 flex items-center justify-center font-bold text-black"
          }
          onClick={increment}
        >
          {">"}
        </button>
      </h1>
      <div className={"flex flex-row"}>
        <>
          {" "}
          <div id="border">Income After Shared Expenses:</div>
          <div id="border">{member.takeHome - sharedCost()}</div>
        </>
      </div>
      <AddMemberExpense member={member} />
      {party.memberExpenses[member.name] && (
        <>
          <div id="border">
            {party.memberExpenses[member.name].map((expense: IExpense) => {
              return (
                <ExpenseDisplay
                  key={JSON.stringify(expense)}
                  expense={expense}
                  member={member}
                />
              );
            })}
          </div>
          <div className={"flex flex-row"}>
            <>
              {" "}
              <div id="border">Income After All Expenses:</div>
              <div id="border">
                {member.takeHome - sharedCost() - individualCost()}
              </div>
            </>
          </div>
        </>
      )}
    </div>
  );
}
