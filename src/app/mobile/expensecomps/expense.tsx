import { createContext, useState } from "react";
import IndividualExpenses from "./individualexpenses";
import PartyAdder from "./partyadder";
import SharedExpenseAdder from "./sharedexpenseadder";
import Parties from "./parties";

export interface IParty {
  name: string;
  takeHome: number;
  individualExpenses?: IIndividualExpense[];
}
export interface IIndividualExpense {
  title: string;
  cost: number;
}
export interface ISharedExpense {
  title: string;
  cost: number;
  fixed: boolean;
}

interface ExpenseContextType {
  parties: IParty[];
  sharedExpenses: ISharedExpense[];
  addParty: (newParty: IParty) => void;
  addSharedExpense: (newExpense: ISharedExpense) => void;
  addExpenseToParty: (
    partyIndex: number,
    newExpense: IIndividualExpense,
  ) => void;
}

//cast empty object to contexttype
export const ExpenseContext = createContext<ExpenseContextType>(
  {} as ExpenseContextType,
);

export default function Expense() {
  const [parties, setParties] = useState<IParty[]>([]);
  const [sharedExpenses, setSharedExpenses] = useState<ISharedExpense[]>([]);
  const addParty = (newParty: IParty) => {
    const newParties = [...parties];
    newParties.push(newParty);
    setParties(newParties);
  };
  const addSharedExpense = (newExpense: ISharedExpense) => {
    const newExpenses = [...sharedExpenses];
    newExpenses.push(newExpense);
    setSharedExpenses(newExpenses);
  };
  const addExpenseToParty = (
    partyIndex: number,
    newExpense: IIndividualExpense,
  ) => {
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
  return (
    <ExpenseContext.Provider
      value={{
        parties,
        sharedExpenses,
        addParty,
        addSharedExpense,
        addExpenseToParty,
      }}
    >
      {" "}
      <div className={"flex flex-col w-full h-full"}>
        <PartyAdder />
        <SharedExpenseAdder />
        <Parties />
        <SharedExpenseAdder />
        <IndividualExpenses />
      </div>
    </ExpenseContext.Provider>
  );
}
