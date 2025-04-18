"use client";
import { useRouter } from "next/navigation";
import List from "../components/list";
import UserForm from "../components/userform";

export default function UsersPage() {
  const router = useRouter();
  const logId = (elementId: number) => {
    router.push("desktop/users/" + elementId);
  };
  const valuesToDisplay: Record<string, string> = {};
  valuesToDisplay["firstName"] = "First Name";
  valuesToDisplay["lastName"] = "Last Name";
  valuesToDisplay["email"] = "Email";
  valuesToDisplay["admin"] = "Admin Privilages";
  return (
    <div className={"w-full h-full bg-background flex flex-col relative"}>
      <List
        name="Users"
        api="users"
        passId={logId}
        form={<UserForm />}
        valuesToDisplay={valuesToDisplay}
      />
    </div>
  );
}
