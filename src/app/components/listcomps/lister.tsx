import { useContext } from "react";
import DesktopWindow from "../sitecomps/desktopwindow";
import { TaskbarContext } from "../sitecomps/toplevel";
import List from "./list";

export default function Lister() {
  const { windows, setWindows, beers, setBeers } = useContext(TaskbarContext);

  const handleClick = (window: JSX.Element) => {
    for (let i = 0; i < windows.length; i++) {
      if (windows[i].key == window.key) {
        const newWindows = windows.toSpliced(i, 1);
        setWindows(newWindows);
        return;
      }
    }
    setWindows([...windows, window]);
  };

  const getData = async (id: string) => {
    if (id) {
      const formData = new FormData();
      formData.append("id", id);
      try {
        const response = await fetch("/api/getbeerbyid/", {
          method: "POST",
          body: formData,
        });
        const beerData = await response.json();
        for (let i = 0; i < beers.length; i++) {
          if (beerData.Beer == beers[i].Beer) {
            return;
          }
        }
        const prevBeers = beers;
        setBeers([...prevBeers, beerData]);
      } catch (err: unknown) {
        if (err instanceof Error) {
          return new Response(
            JSON.stringify({ error: err.message || err.toString() }),
            { status: 500, headers: {} },
          );
        } else {
          console.log(err);
        }
      }
    }
  };

  const randomOutput = (data: never[]) => {
    alert(Object.values(data[Math.floor(Math.random() * data.length)])[0]);
  };
  return (
    <DesktopWindow title="Lists" width={"8rem"} height={""}>
      <div
        id="button-taskbar"
        onClick={() =>
          handleClick(
            <List
              title="Drank"
              api="/api/drank/"
              key={"Drank"}
              itemHandleClick={getData}
              adminNeeded={true}
              submit={() => {}}
              actionNeeded={false}
            />,
          )
        }
      >
        Drank
      </div>{" "}
      <div
        id="button-taskbar"
        onClick={() =>
          handleClick(
            <List
              title="Drink"
              api="/api/drink/"
              key={"Drink"}
              itemHandleClick={getData}
              adminNeeded={true}
              submit={() => {}}
              actionNeeded={false}
            />,
          )
        }
      >
        Drink
      </div>
      <div
        id="button-taskbar"
        onClick={() =>
          handleClick(
            <List
              title="Suggestion"
              api="/api/suggestion/"
              key={"Suggestion"}
              itemHandleClick={() => {}}
              adminNeeded={false}
              submit={() => {}}
              actionNeeded={false}
            />,
          )
        }
      >
        Suggestion
      </div>{" "}
      <div
        id="button-taskbar"
        onClick={() =>
          handleClick(
            <List
              title="Ideas"
              api="/api/idea/"
              key={"Ideas"}
              itemHandleClick={() => {}}
              adminNeeded={true}
              submit={randomOutput}
              actionNeeded={true}
            />,
          )
        }
      >
        Ideas
      </div>{" "}
    </DesktopWindow>
  );
}
