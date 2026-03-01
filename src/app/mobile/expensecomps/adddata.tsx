import { useState } from "react";
import AddMember from "./addmember";
import AddSharedExpense from "./addsharedexpense";

export default function AddData() {
  const [active, setActive] = useState("");
  const activate = (key: string) => {
    if (key === active) {
      deactivate();
    } else {
      setActive(key);
    }
  };
  const deactivate = () => {
    setActive("");
  };
  const addRecord: Record<string, JSX.Element> = {
    Member: <AddMember callback={deactivate} />,
    Expense: <AddSharedExpense callback={deactivate} />,
  };
  return (
    <>
      <div className={"flex flex-row"}>
        <button onClick={() => activate("Member")} id="button">
          Add Member
        </button>
        <button onClick={() => activate("Expense")} id="button">
          Add Shared Expense
        </button>
      </div>
      {addRecord[active]}
    </>
  );
}
