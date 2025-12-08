import { useState } from "react";

interface IParty {
  name: string;
  takeHome: number;
  individualExpenses?: IIndividualExpense[];
}
interface IIndividualExpense {
  title: string;
  cost: number;
}
interface ISharedExpense {
  title: string;
  cost: number;
  fixed: boolean;
}

export default function Expense() {
  const [parties, setParties] = useState<IParty[]>([]);
  const [expenses, setExpenses] = useState<ISharedExpense[]>([]);
  const addParty = (newParty: IParty) => {
    const newParties = [...parties];
    newParties.push(newParty);
    setParties(newParties);
  };
  const addSharedExpense = (newExpense: ISharedExpense) => {
    const newExpenses = [...expenses];
    newExpenses.push(newExpense);
    setExpenses(newExpenses);
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
    <div className={"flex flex-col w-full h-full"}>
      <PartyAdder add={addParty} />
      <SharedExpenseAdder add={addSharedExpense} />
      <Parties parties={parties} />
      <SharedExpenses expenses={expenses} />
      <IndividualExpenses addExpense={addExpenseToParty} parties={parties} />
    </div>
  );
}

export function IndividualExpenses(props: {
  parties: IParty[];
  addExpense: (partyIndex: number, newExpense: IIndividualExpense) => void;
}) {
  const [partyIndex, setPartyIndex] = useState(0);
  const { parties } = props;
  const increment = () => {
    if (partyIndex + 1 !== parties.length) {
      setPartyIndex(partyIndex + 1);
    } else {
      setPartyIndex(0);
    }
  };
  const decrement = () => {
    if (partyIndex !== 0) {
      setPartyIndex(partyIndex - 1);
    } else {
      setPartyIndex(parties.length - 1);
    }
  };
  return (
    <div id="border" className={"flex flex-col h-full"}>
      {parties.length > 0 ? (
        <>
          <h1 id="border" className={"text-center flex justify-between"}>
            <div
              id="border"
              className={"w-6 h-6 flex items-center justify-center font-bold"}
              onClick={decrement}
            >
              {"<"}
            </div>
            {parties[partyIndex].name} Individual Expenses
            <div
              id="border"
              className={"w-6 h-6 flex items-center justify-center font-bold"}
              onClick={increment}
            >
              {">"}
            </div>
          </h1>
          <IndividualExpenseAdder
            add={props.addExpense}
            partyIndex={partyIndex}
          />

          {parties[partyIndex].individualExpenses && (
            <div id="border" className={"h-full"}>
              {parties[partyIndex].individualExpenses.map(
                (expense: IIndividualExpense) => {
                  return (
                    <div
                      className={"flex flex-row"}
                      key={JSON.stringify(expense)}
                    >
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
                },
              )}
            </div>
          )}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
export function IndividualExpenseAdder(props: {
  add: (partyIndex: number, newExpense: IIndividualExpense) => void;
  partyIndex: number;
}) {
  const [title, setTitle] = useState("");
  const [cost, setCost] = useState(0);

  return (
    <div id="border" className={"flex flex-col w-full "}>
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
            props.add(props.partyIndex, { title: title, cost: cost });
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

export function Parties(props: { parties: IParty[] }) {
  const [show, setShow] = useState(true);
  const toggleShow = () => {
    setShow(!show);
  };
  return (
    <div id="border">
      <div id="title" className={"Utilitiesflex justify-between"}>
        <>Parties Sharing Expenses:</>
        <button
          id="border"
          onClick={toggleShow}
          className={"flex h-full w-6 pr-2 bg-black justify-start items-end"}
        >
          <div className={"bg-black w-1/2 h-1/8"}></div>
        </button>
      </div>
      {show && (
        <>
          {" "}
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
        </>
      )}
    </div>
  );
}
export function SharedExpenses(props: { expenses: ISharedExpense[] }) {
  const [show, setShow] = useState(true);
  const toggleShow = () => {
    setShow(!show);
  };
  return (
    <>
      <div id="border">
        <div id="title" className={"flex justify-between"}>
          <>Shared Expenses:</>
          <button
            id="border"
            onClick={toggleShow}
            className={"flex h-full w-6 pr-2 bg-black justify-start items-end"}
          >
            <div className={"bg-black w-1/2 h-1/8"}></div>
          </button>
        </div>
        {show && (
          <>
            Fixed:
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
                  <div
                    className={"flex flex-row"}
                    key={JSON.stringify(expense)}
                  >
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
              })}{" "}
            Flex:
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
                  <div
                    className={"flex flex-row"}
                    key={JSON.stringify(expense)}
                  >
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
          </>
        )}
      </div>
    </>
  );
}

export function PartyAdder(props: { add: (newParty: IParty) => void }) {
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
              props.add({ name: name, takeHome: takeHome });
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
export function SharedExpenseAdder(props: {
  add: (newExpense: ISharedExpense) => void;
}) {
  const [show, setShow] = useState(true);
  const toggleShow = () => {
    setShow(!show);
  };
  const [title, setTitle] = useState("");
  const [cost, setCost] = useState(0);
  const [fixed, setFixed] = useState(true);

  const toggleFixed = () => {
    setFixed(!fixed);
  };

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
            <Radio
              true="Fixed"
              false="Flex"
              bool={fixed}
              toggle={toggleFixed}
            />
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
