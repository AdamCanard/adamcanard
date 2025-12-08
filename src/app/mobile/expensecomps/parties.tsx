import { useContext, useState } from "react";
import { ExpenseContext } from "./expense";

export default function Parties() {
  const { parties } = useContext(ExpenseContext);
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
          {parties.map((party) => {
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
