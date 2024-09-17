import ClientPage from "./clientcomps/clientpage";
import TaskbarWrapper from "./clientcomps/taskbarwrapper";

export default function Page() {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <TaskbarWrapper>
        <ClientPage />
      </TaskbarWrapper>
    </div>
  );
}

//
