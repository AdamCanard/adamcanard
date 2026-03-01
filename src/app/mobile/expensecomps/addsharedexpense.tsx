import { useContext, useState } from "react";
import { ExpenseContext } from "./expense";

export default function AddSharedExpense() {
  const { addExpense } = useContext(ExpenseContext);

  const [title, setTitle] = useState("");
  const [cost, setCost] = useState(0);

  return (
    <div id="border" className={"flex flex-col w-full "}>
      <div id="title" className={"flex justify-between"}>
        <>New Shared Expense:</>
      </div>
      <div className={"flex flex-row justify-around "}>
        <div className={"flex flex-row w-full gap-2"}>
          <input
            placeholder="Title"
            className={"w-full"}
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
          <input
            placeholder="Monthly Cost"
            className={"w-full"}
            type="number"
            name="cost"
            value={cost === 0 ? "" : cost}
            onChange={(e) => setCost(+e.target.value)}
          ></input>
        </div>
        <button
          id="button"
          onClick={() => {
            addExpense({ title: title, cost: cost });
            setTitle("");
            setCost(0);
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
}
