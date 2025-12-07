import Beer from "./beer";
import Expense from "./expensecomps/expense";
import Info from "./info";
import Recipe from "./recipe";

export const tabLibrary: Record<string, JSX.Element> = {
  Info: <Info key={"Info"} />,
  Adam: <Beer key={"Adam"} />,
  Recipe: <Recipe key={"Recipe"} />,
  Expense: <Expense key={"Expense"} />,
};
