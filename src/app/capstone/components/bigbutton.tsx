interface IBigButton {
  runFunction: () => void;
  text: string;
}

export default function BigButton(props: IBigButton) {
  return (
    <button
      name={props.text}
      className={
        "bg-primary border-2 border-text text-center p-5 w-full shadow-md rounded-md font-semibold"
      }
      onClick={() => props.runFunction()}
    >
      {props.text}
    </button>
  );
}
