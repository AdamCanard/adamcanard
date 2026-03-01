import { useContext, useState } from "react";
import { ExpenseContext, IExpense, IMember } from "./expense";

export default function ExpenseDisplay(props: {
  expense: IExpense;
  member?: IMember;
}) {
  const {} = useContext(ExpenseContext);
  const { expense } = props;
  const [title, setTitle] = useState(expense.title);
  const [cost, setCost] = useState(expense.cost);
  const [edit, setEdit] = useState(false);
  return (
    <div className={"flex flex-row h-7 w-full justify-center items-center"}>
      <input
        disabled={!edit}
        className={"w-1/2"}
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      ></input>
      <input
        disabled={!edit}
        className={"w-1/2"}
        type="number"
        value={cost === 0 ? "" : cost}
        onChange={(e) => setCost(+e.target.value)}
      ></input>
      {!edit ? (
        <button
          id="border-np"
          className={"w-12 flex justify-center items-center "}
          onClick={() => setEdit(!edit)}
        >
          Edit
        </button>
      ) : (
        <button
          id="border-np"
          className={"w-12 flex justify-center items-center "}
          onClick={() => {
            if (props.member) {
            }
            setEdit(!edit);
          }}
        >
          Save
        </button>
      )}
    </div>
  );
}
