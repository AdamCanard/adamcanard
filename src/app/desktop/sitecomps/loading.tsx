export default function Loading() {
  return (
    <div
      id="boxshadow"
      className={
        "w-1/8 h-10 top-[50%] left-[50%] absolute justify-center items-center"
      }
      style={{ transform: "translate(-50%, -50%)" }}
    >
      <h1 id="title">Logging you in...</h1>
    </div>
  );
}
