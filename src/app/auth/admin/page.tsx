import AdminPanel from "./adminpanel";

export default function Page() {
  return (
    <>
      <div className="flex justify-center items-center w-full h-screen">
        <div className="w-1/3">
          <AdminPanel />
        </div>
      </div>
    </>
  );
}
