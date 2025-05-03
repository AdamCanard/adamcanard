import { useContext, useEffect, useMemo, useState } from "react";
import { IScreenActions, ScreenContext } from "../gamecontainer";

export default function Home() {
  const [selected, setSelected] = useState(0);
  const { setControls, changeScreen } = useContext(ScreenContext);
  const buttons = ["play", "skip", "credits"];
  const gridControls: IScreenActions = useMemo(
    () => ({
      a: () => {
        changeScreen(buttons[selected]);
      },
      b: () => {},
      up: () => {
        if (selected !== 0) {
          const newIndex = selected - 1;
          setSelected(newIndex);
        }
      },
      down: () => {
        if (selected !== 2) {
          const newIndex = selected + 1;
          setSelected(newIndex);
        }
      },
      left: () => {},
      right: () => {},
      start: () => {},
      select: () => {},
    }),

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setSelected, selected, changeScreen],
  );

  useEffect(() => {
    setControls(gridControls);
  }, [gridControls, setControls]);

  return (
    <div className={"GridSize border-2 flex flex-col justify-around"}>
      <div className={"w-full text-3xl text-center"}>Made Games</div>
      <div className={"w-full flex flex-col gap-4  items-center"}>
        {buttons.map((button) => {
          return (
            <HomeButton
              title={button}
              buttons={buttons}
              selected={selected}
              key={button}
            />
          );
        })}
      </div>
    </div>
  );
}

function HomeButton(props: {
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
