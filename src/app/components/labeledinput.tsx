import { Dispatch, SetStateAction } from "react";

export default function LabeledInput(props: {
  required: boolean;
  title: string;
  state: string;
  setState: Dispatch<SetStateAction<string>>;
}) {
  return (
    <>
      <label id="border" className="flex justify-between">
        Enter {props.title}:
        {props.required ? (
          <input
            required
            type="text"
            name={props.title}
            value={props.state}
            onChange={(e) => props.setState(e.target.value)}
          />
        ) : (
          <input
            type="text"
            name={props.title}
            value={props.state}
            onChange={(e) => props.setState(e.target.value)}
          />
        )}
      </label>
    </>
  );
}
