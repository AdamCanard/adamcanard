import { createContext, useState } from "react";
import SharedExpenses from "./sharedexpenses";
import AddMember from "./addmember";
import Members from "./members";
import AddSharedExpense from "./addsharedexpense";
import MemberExpenses from "./memberexpenses";

export interface IParty {
  members: IMember[];
  partyExpenses: IExpense[];
  memberExpenses: Record<string, IExpense[]>;
}
export interface IMember {
  name: string;
  takeHome: number;
}
export interface IExpense {
  title: string;
  cost: number;
}

interface ExpenseContextType {
  party: IParty;
  addMember: (newMember: IMember) => void;
  addExpense: (newExpense: IExpense, member?: IMember) => void;
  sharedCost: () => number;
}

//cast empty object to contexttype
export const ExpenseContext = createContext<ExpenseContextType>(
  {} as ExpenseContextType,
);

export default function Expense() {
  const [party, setParty] = useState<IParty>(() => {
    const storedParties = localStorage.getItem("party");
    if (storedParties === null) {
      return { members: [], partyExpenses: [], memberExpenses: {} };
    } else {
      return JSON.parse(storedParties);
    }
  });

  const sharedCost = () => {
    let totalSharedCost = 0;
    for (let i = 0; i < party.partyExpenses.length; i++) {
      totalSharedCost += party.partyExpenses[i].cost;
    }
    return totalSharedCost / party.members.length;
  };

  const addMember = (newMember: IMember) => {
    const newParty = { ...party };
    newParty.members.push(newMember);
    setParty(newParty);
  };
  const addExpense = (newExpense: IExpense, member?: IMember) => {
    if (member) {
      const newParty = { ...party };
      const newMemberExpenses = newParty.memberExpenses[member.name] || [];
      newMemberExpenses.push(newExpense);
      newParty.memberExpenses[member.name] = newMemberExpenses;
      setParty(newParty);
    } else {
      const newParty = { ...party };
      newParty.partyExpenses.push(newExpense);
      setParty(newParty);
    }
  };
  const saveExpense = () => {
    localStorage.setItem("party", JSON.stringify(party));
  };

  return (
    <ExpenseContext.Provider
      value={{
        party,
        addMember,
        addExpense,
        sharedCost,
      }}
    >
      <div className={"flex flex-col w-full h-full overflow-y-auto"}>
        <AddMember />
        <AddSharedExpense />
        {party.members.length > 0 && <Members />}
        {party.partyExpenses.length > 0 && <SharedExpenses />}
        {party.members.length > 0 && <MemberExpenses />}
        <div
          id="button"
          className={"absolute bottom-3 right-3"}
          onClick={saveExpense}
        >
          Save
        </div>
      </div>
    </ExpenseContext.Provider>
  );
}
