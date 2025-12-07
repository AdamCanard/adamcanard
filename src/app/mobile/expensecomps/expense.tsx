import { useState } from "react";

interface IParty {
  name: string;
  takeHome: number;
}

export default function Expense() {
  const [parties, setParties] = useState<IParty[]>([]);
  const addParty = (newParty: IParty) => {
    const newParties = [...parties];
    newParties.push(newParty);
    setParties(newParties);
  };
  return (
    <div className={"flex flex-col w-full h-full"}>
      <PartyAdder add={addParty} />
    </div>
  );
}

export function PartyAdder(props: { add: (newParty: IParty) => void }) {
  const [name, setName] = useState("");
  const [takeHome, setTakeHome] = useState(0);

  return (
    <div id="border" className={"flex flex-row w-full justify-around"}>
      <div className={"flex flex-row w-3/4"}>
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
          props.add({ name: name, takeHome: takeHome });
          setName("");
          setTakeHome(0);
        }}
      >
        Add
      </button>
    </div>
  );
}
