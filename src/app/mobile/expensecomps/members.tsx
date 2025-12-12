import { useContext, useState } from "react";
import { ExpenseContext } from "./expense";

export default function Members() {
  const { party } = useContext(ExpenseContext);
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
          {party.members.map((member) => {
            return (
              <div className={"flex flex-row"} key={JSON.stringify(member)}>
                <input
                  disabled
                  className={"w-1/2"}
                  type="text"
                  value={member.name}
                ></input>
                <input
                  disabled
                  className={"w-1/2"}
                  type="number"
                  value={member.takeHome}
                ></input>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
