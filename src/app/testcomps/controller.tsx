export default function Controller(props: { move: (arg0: string) => void }) {
  return (
    <div className={"h-52 flex flex-col"}>
      <div className={"flex flex-row justify-around items-center pt-8"}>
        {" "}
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
      <div
        className={"flex flex-row gap-2 justify-center items-end h-full pb-2"}
      >
        <button
          className={"justify-center items-center flex w-6 h-6 border-2"}
          onClick={() => props.move("sel")}
        >
          Sel
        </button>
        <button
          className={"justify-center items-center flex w-6 h-6 border-2"}
          onClick={() => props.move("sta")}
        >
          Sta
        </button>
      </div>
    </div>
  );
}
