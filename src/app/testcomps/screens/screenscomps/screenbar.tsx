export default function ScreenBar() {
  return (
    <div
      className={
        "h-8 w-full bg-black flex justify-around items-center text-white flex-row absolute bottom-0"
      }
    >
      <div>{"Press A to interact"}</div>
      <div>{"Press B to go back"}</div>
    </div>
  );
}
