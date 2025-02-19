export default function Controller(props: { move: (arg0: string) => void }) {
  return (
    <div className={"h-64"}>
      <div className={"grid grid-cols-3 grid-rows-3 w-24 h-16"}>
        {" "}
        <button
          className={
            "col-start-2  row-start-1 justify-center items-center flex w-8 h-full border-2"
          }
          onClick={() => props.move("u")}
        >
          U
        </button>
        <button
          className={
            "col-start-2  row-start-3  justify-center items-center flex w-8 h-full border-2"
          }
          onClick={() => props.move("d")}
        >
          D
        </button>
        <button
          className={
            "col-start-2 row-start-2 justify-center items-center flex w-8 h-full border-2"
          }
        ></button>
        <button
          className={
            "col-start-1 row-start-2 justify-center items-center flex w-8 h-full border-2"
          }
          onClick={() => props.move("l")}
        >
          L
        </button>
        <button
          className={
            "col-start-3 row-start-2 justify-center items-center flex w-8 h-full border-2"
          }
          onClick={() => props.move("r")}
        >
          R{" "}
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
