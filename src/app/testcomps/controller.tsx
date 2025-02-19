export default function Controller(props: { move: (arg0: string) => void }) {
  return (
    <div className={"h-64"}>
      <div className={"grid grid-cols-3 grid-rows-2 w-full h-16"}>
        {" "}
        <button
          id="button"
          className={
            "col-start-2 col-span-1 row-start-1 row-span-1 justify-center items-center flex w-full h-full "
          }
          onClick={() => props.move("u")}
        >
          UP
        </button>
        <button
          id="button"
          className={
            "col-start-2 col-span-1 row-start-2 row-span-1 justify-center items-center flex w-full h-full "
          }
          onClick={() => props.move("d")}
        >
          DOWN
        </button>
        <button
          id="button"
          className={
            "col-start-1 col-span-1 row-start-2 row-span-2 justify-center items-center flex w-full h-full "
          }
          onClick={() => props.move("l")}
        >
          LEFT
        </button>
        <button
          id="button"
          className={
            "col-start-3 col-span-1 row-start-2 row-span-2 justify-center items-center flex w-full h-full "
          }
          onClick={() => props.move("r")}
        >
          RIGHT
        </button>
      </div>

      <button
        id="button"
        className={"justify-center items-center flex w-1/2 h-16 border-2"}
        onClick={() => props.move("a")}
      >
        A
      </button>
    </div>
  );
}
