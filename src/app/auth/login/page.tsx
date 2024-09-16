import Login from "./login";

export default function Page() {
  return (
    <>
      <div className="flex justify-center items-center w-full h-screen">
        <div className="w-1/4">
          <Login />
        </div>
      </div>
    </>
  );
}
