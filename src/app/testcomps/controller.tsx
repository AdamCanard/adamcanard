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
          ></button>
          <button
            id="DPadButtonDown"
            className={"col-start-2 row-start-3 rounded-b DPad DPadButtonDown"}
            onClick={() => props.move("d")}
          ></button>
          <button className={"col-start-2 row-start-2 DPad"}></button>
          <button
            id="DPadButtonLeft"
            className={"col-start-1 row-start-2 rounded-l DPad DPadButtonLeft "}
            onClick={() => props.move("l")}
          ></button>
          <button
            id="DPadButtonRight"
            className={
              "col-start-3 row-start-2 rounded-r DPad DPadButtonRight "
            }
            onClick={() => props.move("r")}
          ></button>
        </div>
        <div className={"grid grid-cols-2 grid-rows-2"}>
          {" "}
          <button
            className={"col-start-1 row-start-1 ControllerButton"}
            onClick={() => props.move("a")}
          >
            A
          </button>
          <button
            className={"col-start-2 row-start-2 ControllerButton"}
            onClick={() => props.move("b")}
          >
            B
          </button>
        </div>
      </div>
      <div
        className={"flex flex-row gap-2 justify-center items-end h-full pb-2"}
      >
        <button
          className={"ControllerButton"}
          onClick={() => props.move("sel")}
        >
          Sel
        </button>
        <button
          className={"ControllerButton"}
          onClick={() => props.move("sta")}
        >
          Sta
        </button>
      </div>
    </div>
  );
}
