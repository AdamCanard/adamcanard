export default function Controller(props: { move: (arg0: string) => void }) {
  return (
    <div className={"h-52 flex flex-col"}>
      <div className={"flex flex-row justify-around items-center pt-8"}>
        {" "}
        <div className={"grid grid-cols-3 grid-rows-3 w-24 h-24"}>
          {" "}
          <button
            id="DPadButtonUp"
            className={"col-start-2  row-start-1 rounded-t DPad DPadButtonUp "}
            onClick={() => props.move("u")}
          >
            U
          </button>
          <button
            id="DPadButtonDown"
            className={"col-start-2 row-start-3 rounded-b DPad DPadButtonDown"}
            onClick={() => props.move("d")}
          >
            D
          </button>
          <button className={"col-start-2 row-start-2 DPad"}></button>
          <button
            id="DPadButtonLeft"
            className={"col-start-1 row-start-2 rounded-l DPad DPadButtonLeft "}
            onClick={() => props.move("l")}
          >
            L
          </button>
          <button
            id="DPadButtonRight"
            className={
              "col-start-3 row-start-2 rounded-r DPad DPadButtonRight "
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
