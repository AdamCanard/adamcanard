import { useState } from "react";

interface IParty {
  name: string;
  takeHome: number;
}
interface IExpense {
  title: string;
  cost: number;
  fixed: boolean;
}

export default function Expense() {
  const [parties, setParties] = useState<IParty[]>([]);
  const [expenses, setExpenses] = useState<IExpense[]>([]);
  const addParty = (newParty: IParty) => {
    const newParties = [...parties];
    newParties.push(newParty);
    setParties(newParties);
  };
  const addExpense = (newExpense: IExpense) => {
    const newExpenses = [...expenses];
    newExpenses.push(newExpense);
    setExpenses(newExpenses);
  };
  return (
    <div className={"flex flex-col w-full h-full"}>
      <PartyAdder add={addParty} />
      <SharedExpenseAdder add={addExpense} />
      <Parties parties={parties} />
      <SharedExpenses expenses={expenses} />
    </div>
  );
}

export function Parties(props: { parties: IParty[] }) {
  return (
    <div id="border">
      Parties Sharing Expenses:
      <div className={"flex flex-row"}>
        <div id="border" className={"w-1/2 text-center"}>
          Name:
        </div>
        <div id="border" className={"w-1/2 text-center"}>
          Monthly Take Home:
        </div>
      </div>
      {props.parties.map((party) => {
        return (
          <div className={"flex flex-row"} key={JSON.stringify(party)}>
            <input
              disabled
              className={"w-1/2"}
              type="text"
              value={party.name}
            ></input>
            <input
              disabled
              className={"w-1/2"}
              type="number"
              value={party.takeHome}
            ></input>
          </div>
        );
      })}
    </div>
  );
}
export function SharedExpenses(props: { expenses: IExpense[] }) {
  return (
    <>
      <div id="border">
        Fixed Expenses:
        <div className={"flex flex-row"}>
          <div id="border" className={"w-1/2 text-center"}>
            Title:
          </div>
          <div id="border" className={"w-1/2 text-center"}>
            Monthly Cost:
          </div>
        </div>
        {props.expenses
          .filter((expense) => expense.fixed)
          .map((expense) => {
            return (
              <div className={"flex flex-row"} key={JSON.stringify(expense)}>
                <input
                  disabled
                  className={"w-1/2"}
                  type="text"
                  value={expense.title}
                ></input>
                <input
                  disabled
                  className={"w-1/2"}
                  type="number"
                  value={expense.cost}
                ></input>
              </div>
            );
          })}
      </div>
      <div id="border">
        Flex Expenses:
        <div className={"flex flex-row"}>
          <div id="border" className={"w-1/2 text-center"}>
            Title:
          </div>
          <div id="border" className={"w-1/2 text-center"}>
            Monthly Cost:
          </div>
        </div>
        {props.expenses
          .filter((expense) => !expense.fixed)
          .map((expense) => {
            return (
              <div className={"flex flex-row"} key={JSON.stringify(expense)}>
                <input
                  disabled
                  className={"w-1/2"}
                  type="text"
                  value={expense.title}
                ></input>
                <input
                  disabled
                  className={"w-1/2"}
                  type="number"
                  value={expense.cost}
                ></input>
              </div>
            );
          })}
      </div>
    </>
  );
}

export function PartyAdder(props: { add: (newParty: IParty) => void }) {
  const [name, setName] = useState("");
  const [takeHome, setTakeHome] = useState(0);

  return (
    <div id="border" className={"flex flex-col w-full "}>
      New Party:
      <div className={"flex flex-row justify-around "}>
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
    </div>
  );
}
export function SharedExpenseAdder(props: {
  add: (newExpense: IExpense) => void;
}) {
  const [title, setTitle] = useState("");
  const [cost, setCost] = useState(0);
  const [fixed, setFixed] = useState(true);

  const toggleFixed = () => {
    setFixed(!fixed);
  };

  return (
    <div id="border" className={"flex flex-col w-full "}>
      New Expense:
      <div className={"flex flex-row justify-around "}>
        <div className={"flex flex-row w-3/4 gap-2"}>
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
          <Radio true="Fixed" false="Flex" bool={fixed} toggle={toggleFixed} />
        </div>
        <button
          id="button"
          onClick={() => {
            props.add({ title: title, cost: cost, fixed: fixed });
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
