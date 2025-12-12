import { createContext, useState } from "react";
import IndividualExpenses from "./individualexpenses";
import PartyAdder from "./partyadder";
import SharedExpenseAdder from "./sharedexpenseadder";
import Parties from "./parties";
import SharedExpenses from "./sharedexpenses";

export interface IParty {
  name: string;
  takeHome: number;
  individualExpenses?: IExpense[];
}
export interface IExpense {
  title: string;
  cost: number;
}

interface ExpenseContextType {
  parties: IParty[];
  sharedExpenses: IExpense[];
  addParty: (newParty: IParty) => void;
  addSharedExpense: (newExpense: IExpense) => void;
  addExpenseToParty: (partyIndex: number, newExpense: IExpense) => void;
  sharedCost: () => number;
}

//cast empty object to contexttype
export const ExpenseContext = createContext<ExpenseContextType>(
  {} as ExpenseContextType,
);

export default function Expense() {
  const [parties, setParties] = useState<IParty[]>(() => {
    const storedParties = localStorage.getItem("parties");
    if (storedParties === null) {
      return [];
    } else {
      return JSON.parse(storedParties);
    }
  });
  const [sharedExpenses, setSharedExpenses] = useState<IExpense[]>(() => {
    const sharedExpenses = localStorage.getItem("sharedExpenses");
    if (sharedExpenses === null) {
      return [];
    } else {
      return JSON.parse(sharedExpenses);
    }
  });

  const sharedCost = () => {
    let totalSharedCost = 0;
    for (let i = 0; i < sharedExpenses.length; i++) {
      totalSharedCost += sharedExpenses[i].cost;
    }
    return totalSharedCost / parties.length;
  };

  const addParty = (newParty: IParty) => {
    const newParties = [...parties];
    newParties.push(newParty);
    setParties(newParties);
  };

  const addSharedExpense = (newExpense: IExpense) => {
    const newExpenses = [...sharedExpenses];
    newExpenses.push(newExpense);
    setSharedExpenses(newExpenses);
  };

  const addExpenseToParty = (partyIndex: number, newExpense: IExpense) => {
    const newParties = [...parties];
    const newParty = newParties[partyIndex];
    if (newParty.individualExpenses) {
      newParty.individualExpenses?.push(newExpense);
    } else {
      newParty.individualExpenses = [newExpense];
    }
    newParties[partyIndex] = newParty;
    console.log(newParties);
    setParties(newParties);
  };

  const saveExpense = () => {
    localStorage.setItem("parties", JSON.stringify(parties));
    localStorage.setItem("sharedExpenses", JSON.stringify(sharedExpenses));
  };
  return (
    <ExpenseContext.Provider
      value={{
        parties,
        sharedExpenses,
        addParty,
        addSharedExpense,
        addExpenseToParty,
        sharedCost,
      }}
    >
      <div className={"flex flex-col w-full h-full overflow-y-auto"}>
        <PartyAdder />
        <SharedExpenseAdder />
        <Parties />
        <SharedExpenses />
        <IndividualExpenses />
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
