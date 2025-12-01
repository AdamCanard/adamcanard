export default function HomeButton(props: {
  title: string;
  buttons: string[];
  selected: number;
}) {
  const capitalize = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };
  return (
    <div
      className={`${props.buttons[props.selected] === props.title ? "HomeButtonSelected" : "HomeButton"} text-center text-xl w-2/3`}
    >
      {capitalize(props.title)}
    </div>
  );
}
