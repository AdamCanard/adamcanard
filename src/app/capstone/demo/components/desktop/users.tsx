"use client";

import List from "./list";

export default function UsersPage() {
  const logId = (elementId: number) => {
    console.log(elementId);
  };
  const valuesToDisplay: Record<string, string> = {};
  valuesToDisplay["firstName"] = "First Name";
  valuesToDisplay["lastName"] = "Last Name";
  valuesToDisplay["email"] = "Email";
  valuesToDisplay["admin"] = "Admin";
  return (
    <div className={"w-full h-full bg-background flex flex-col relative"}>
      <List
        name="Users"
        api="users"
        passId={logId}
        valuesToDisplay={valuesToDisplay}
      />
    </div>
  );
}
