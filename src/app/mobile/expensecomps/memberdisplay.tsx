import { useContext, useState } from "react";
import { ExpenseContext, IMember } from "./expense";

export default function MemberDisplay(props: { member: IMember }) {
  const { editMember } = useContext(ExpenseContext);
  const { member } = props;
  const [name, setName] = useState(member.name);
  const [takeHome, setTakeHome] = useState(member.takeHome);
  const [edit, setEdit] = useState(false);
  return (
    <div className={"flex flex-row h-7 w-full justify-center items-center"}>
      <input
        disabled={!edit}
        className={"w-1/2"}
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>
      <input
        disabled={!edit}
        className={"w-1/2"}
        type="number"
        value={takeHome === 0 ? "" : takeHome}
        onChange={(e) => setTakeHome(+e.target.value)}
      ></input>
      {!edit ? (
        <button
          id="border-np"
          className={"w-12 flex justify-center items-center "}
          onClick={() => setEdit(!edit)}
        >
          Edit
        </button>
      ) : (
        <button
          id="border-np"
          className={"w-12 flex justify-center items-center "}
          onClick={() => {
            editMember(member.name, { name, takeHome });
            setEdit(!edit);
          }}
        >
          Save
        </button>
      )}
    </div>
  );
}
