import { useContext } from "react";
import DesktopWindow from "../sitecomps/desktopwindow";
import { TaskbarContext } from "../sitecomps/toplevel";

export default function ListWindow(props: {
  api: string;
  data: object;
  id: string;
}) {
  const { windows, setWindows, admin } = useContext(TaskbarContext);
  const keys = Object.keys(props.data);

  const updateItem = () => {};

  const deleteItem = () => {
    deleteById(props.id);
    for (let i = 0; i < windows.length; i++) {
      if (windows[i].key == Object.values(props.data)[0]) {
        const newWindows = windows.toSpliced(i, 1);
        setWindows(newWindows);
      }
    }
  };

  const deleteById = async (id: string) => {
    try {
      const response = await fetch(props.api + id, {
        method: "DELETE",
      });
      const data: object = await response.json();
      return data;
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
  };
  return (
    <DesktopWindow
      title={Object.values(props.data)[0]}
      width={"16rem"}
      height={""}
    >
      {Object.values(props.data).map((data, index: number) => {
        if (!Omit.includes(keys[index])) {
          if ((data as string) !== "" && index !== 0) {
            return (
              <div
                id="border"
                className="flex w-full h-full justify-between items-center p-3"
                key={index + props.id}
              >
                <div>{keys[index]}:</div>
                <div>{data as string}</div>
              </div>
            );
          }
        }
      })}
      {admin && (
        <div id="button-i">
          <div onClick={updateItem} id="button">
            Update
          </div>

          <div onClick={deleteItem} id="button">
            Delete
          </div>
        </div>
      )}
    </DesktopWindow>
  );
}

const Omit = [
  "Start",
  "End",
  "collectionId",
  "collectionName",
  "id",
  "created",
  "updated",
  "Drank",
];
