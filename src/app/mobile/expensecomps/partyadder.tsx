import { useContext, useState } from "react";
import { ExpenseContext } from "./expense";

export default function PartyAdder() {
  const { addParty } = useContext(ExpenseContext);
  const [show, setShow] = useState(true);
  const toggleShow = () => {
    setShow(!show);
  };
  const [name, setName] = useState("");
  const [takeHome, setTakeHome] = useState(0);

  return (
    <div id="border" className={"flex flex-col w-full "}>
      <div id="title" className={"flex justify-between"}>
        <>New Party:</>
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
          <div className={"flex flex-row w-full"}>
            <input
              placeholder="Name"
              className={"w-full"}
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
            <input
              placeholder="Take Home Income"
              className={"w-full"}
              type="number"
              name="takeHome"
              value={takeHome === 0 ? "" : takeHome}
              onChange={(e) => setTakeHome(+e.target.value)}
            ></input>
          </div>
          <button
            id="button"
            onClick={() => {
              addParty({ name: name, takeHome: takeHome });
              setName("");
              setTakeHome(0);
            }}
          >
            Add
          </button>
        </div>
      )}
    </div>
  );
}
