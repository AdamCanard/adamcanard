import { useContext, useState } from "react";
import { ExpenseContext } from "./expense";

export default function AddMember(props: { callback: () => void }) {
  const { addMember } = useContext(ExpenseContext);

  const [name, setName] = useState("");
  const [takeHome, setTakeHome] = useState(0);

  return (
    <div id="border" className={"flex flex-col w-full "}>
      <div id="title" className={"flex justify-between"}>
        <>New Party:</>
        <button id="close" onClick={() => props.callback()}></button>
      </div>
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
            addMember({ name: name, takeHome: takeHome });
            setName("");
            setTakeHome(0);
            props.callback();
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
}
