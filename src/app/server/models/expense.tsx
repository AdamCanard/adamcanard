import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema({
  partyname: String,
  party: {
    members: [{ name: String, takeHome: Number }],
    partyExpenses: [{ title: String, cost: Number }],
    memberExpenses: {
      memberName: [String],
      memberExpense: [{ title: String, cost: Number }],
    },
  },
});

export const Expense =
  mongoose.models["Expense"] || mongoose.model("Expense", ExpenseSchema);

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
