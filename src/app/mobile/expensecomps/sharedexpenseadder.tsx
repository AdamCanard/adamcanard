import { useContext, useState } from "react";
import { ExpenseContext } from "./expense";

export default function SharedExpenseAdder() {
  const { addSharedExpense } = useContext(ExpenseContext);
  const [show, setShow] = useState(true);
  const toggleShow = () => {
    setShow(!show);
  };
  const [title, setTitle] = useState("");
  const [cost, setCost] = useState(0);

  return (
    <div id="border" className={"flex flex-col w-full "}>
      <div id="title" className={"flex justify-between"}>
        <>New Shared Expense:</>
        <button
          id="border"
          onClick={toggleShow}
          className={"flex h-full w-6 pr-2 bg-black justify-start items-end"}
        >
          <div className={"bg-black w-1/2 h-1/8"}></div>
        </button>
      </div>
      {show && (
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
              addSharedExpense({ title: title, cost: cost });
              setTitle("");
              setCost(0);
            }}
          >
            Add
          </button>
        </div>
      )}
    </div>
  );
}

export function Radio(props: {
  true: string;
  false: string;
  bool: boolean;
  toggle: () => void;
}) {
  return (
    <div id="border" className={`flex w-full h-full`} onClick={props.toggle}>
      <div
        className={`w-1/2 h-full text-center ${props.bool && "bg-blue-600 text-white"}`}
      >
        {props.true}
      </div>
      <div
        className={`w-1/2 h-full  text-center ${!props.bool && "bg-blue-600 text-white"}`}
      >
        {props.false}
      </div>
    </div>
  );
}
