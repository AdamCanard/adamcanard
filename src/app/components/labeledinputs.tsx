import { Dispatch, SetStateAction } from "react";

export function LabeledInputStr(props: {
  required: boolean;
  title: string;
  state: string;
  setState: Dispatch<SetStateAction<string>>;
  type: string;
}) {
  return (
    <>
      <label id="border" className="flex justify-between w-full text-sm">
        Enter {props.title}:
        {props.required ? (
          <input
            autoComplete="off"
            required
            type={props.type}
            name={props.title}
            value={props.state}
            onChange={(e) => props.setState(e.target.value)}
          />
        ) : (
          <input
            autoComplete="off"
            type={props.type}
            name={props.title}
            value={props.state}
            onChange={(e) => props.setState(e.target.value)}
          />
        )}
      </label>
    </>
  );
}

export function LabeledInputNum(props: {
  required: boolean;
  title: string;
  state: number;
  setState: Dispatch<SetStateAction<number>>;
}) {
  return (
    <>
      <label id="border" className="flex justify-between w-full text-sm">
        Enter {props.title}:
        {props.required ? (
          <input
            required
            type="number"
            name={props.title}
            value={props.state}
            onChange={(e) => props.setState(+e.target.value)}
          />
        ) : (
          <input
            type="number"
            name={props.title}
            value={props.state}
            onChange={(e) => props.setState(+e.target.value)}
          />
        )}
      </label>
    </>
  );
}
