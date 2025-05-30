export default function LabeledBeerInput(props: {
  type: string;
  label: string;
  name: string;
  required?: boolean;
}) {
  return (
    <div id={"border"} className={"w-full flex justify-between items-center"}>
      <label className={"pl-1 w-full"}>{props.label}:</label>
      {props.required ? (
        <input
          className={"w-full"}
          type={props.type}
          name={props.name}
          required
        />
      ) : (
        <input className={"w-full"} type={props.type} name={props.name} />
      )}
    </div>
  );
}
