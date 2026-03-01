import { useContext } from "react";
import { ExpenseContext } from "./expense";
import AddMember from "./addmember";

export default function Members() {
  const { party } = useContext(ExpenseContext);

  return (
    <>
      <AddMember />
      <div id="border">
        <div id="title" className={"Utilitiesflex justify-between"}>
          <>Members Sharing Expenses:</>
        </div>
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
      </div>
    </>
  );
}
